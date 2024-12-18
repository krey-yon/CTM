import Todo from '../models/Todo.model.js';
import Room from '../models/Room.model.js';
import User from '../models/User.model.js';
// import generateRoomCode from '../utils/generateRoomCode.js';

// Create a new todo and room
const createTodo = async (req, res) => {
  const { title, roomId } = req.body;

  try {
    // Check if the room exists and if the user is a participant
    const room = await Room.findOne({ roomId });
    console.log(room);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (!room.participants.includes(req.user.id)) {
      return res.status(403).json({ error: 'Not authorized to create todos in this room' });
    }

    // Create the todo
    const todo = new Todo({
      title,
      owner: req.user.id,
      collaborators: [req.user.id],
      roomId,
    });
    // console.log(todo);
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read todos in a room
const getTodos = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Check if the room exists
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Add the user to the room if not already a participant
    if (!room.participants.includes(req.user.id)) {
      room.participants.push(req.user.id);
      await room.save();
    }

    // Fetch todos for the room
    const todos = await Todo.find({ roomId }).populate('owner collaborators');
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, task, isDone } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (!todo.Collabrators.includes(req.user.id)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    todo.title = title || todo.title;
    todo.task = task || todo.task;
    todo.isDone = isDone ?? todo.isDone;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    console.log('Todo:', todo);
    console.log('Collaborators:', todo.collaborators);
    console.log('Authenticated User ID:', req.user.id);

    // Ensure the correct comparison of ObjectId or string
    if (!todo.collaborators.map(String).includes(String(req.user.id))) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Instead of remove, use deleteOne or findByIdAndDelete
    await Todo.findByIdAndDelete(id);

    console.log("Todo deleted");
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log("Error deleting todo:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateIsDone = async (req, res) => {
  const { id } = req.params; // Todo ID
  const { isDone } = req.body; // New value for isDone

  try {
    // Find the Todo by ID
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    console.log('Authenticated User ID:', req.user.id);
    console.log('Collaborators:', todo.collaborators);

    // Ensure the user is authorized to update the Todo
    if (!todo.collaborators.map(String).includes(String(req.user.id))) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update the isDone field
    todo.isDone = isDone;
    await todo.save();

    console.log('Updated Todo:', todo);
    res.status(200).json(todo);
  } catch (error) {
    console.log('Error updating isDone:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add a collaborator to a room
const addCollaborator = async (req, res) => {
  const { roomId, collaboratorEmail } = req.body;

  try {
    const todo = await Todo.findOne({ roomId });
    if (!todo) return res.status(404).json({ error: 'Room not found' });

    if (todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const collaborator = await User.findOne({ email: collaboratorEmail });
    if (!collaborator) return res.status(404).json({ error: 'User not found' });

    if (!todo.Collabrators.includes(collaborator._id)) {
      todo.Collabrators.push(collaborator._id);
      await todo.save();
    }

    res.status(200).json({ message: 'Collaborator added', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTodo, updateTodo, deleteTodo, getTodos, addCollaborator, updateIsDone };

