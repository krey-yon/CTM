import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const handleUserSignup = async (req, res) => {
  const { username, password, email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).cookie("token", token).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUserSignOut = async (req, res) => {
  res.clearCookie("token").json({ message: "Signout successful" });
};

export { handleUserSignup, handleUserLogin, handleUserSignOut };
