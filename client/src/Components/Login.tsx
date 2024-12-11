import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { email, password });
      setToken(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        className="border p-2 m-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
