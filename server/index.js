import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cookieParser from "cookie-parser";;
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from "./utils/connect.js"
import todoRoutes from './routes/todo.route.js';
import authRoutes from './routes/auth.route.js';
import roomRoutes from './routes/room.route.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);
app.use('/room', roomRoutes);

// Socket.IO Real-time
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('createTodo', (roomId, todo) => {
    io.to(roomId).emit('todoCreated', todo);
  });

  socket.on('updateTodo', (roomId, updatedTodo) => {
    io.to(roomId).emit('todoUpdated', updatedTodo);
  });

  socket.on('deleteTodo', (roomId, todoId) => {
    io.to(roomId).emit('todoDeleted', todoId);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// MongoDB Connection
const url = process.env.MONGO_URI;
connectToDatabase(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
