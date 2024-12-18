import Room from '../models/Room.model.js';
import Todo from '../models/Todo.model.js';
import generateRoomCode from '../utils/generateRoomCode.js';

// Create a Room
const createRoom = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  const roomId = generateRoomCode();

  try {
    // Create the room
    const room = new Room({ roomId, name, participants: [userId] });
    await room.save();

    // Create a default todo for the room
    const defaultTodo = new Todo({
      title: `Default todo for room`,
      owner: userId,
      collaborators: [userId],
      roomId,
    });
    await defaultTodo.save();

    res.status(201).json({ 
      message: 'Room created successfully', 
      room, 
      defaultTodo 
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Join a Room
const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.id;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Add user to room participants if not already in the room
    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      await room.save();
    }

    res.status(200).json({ 
      message: 'Joined room successfully', 
      room 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createRoom, joinRoom };
