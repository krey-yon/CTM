import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
  addCollaborator,
  updateIsDone,
} from '../controllers/todo.controllers.js';

const router = express.Router();

// CRUD routes
router.post('/create', authenticateToken, createTodo);
router.get('/:roomId', authenticateToken, getTodos);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);
router.patch('/:id', authenticateToken, updateIsDone);

// Collaborator route
router.post('/add-collaborator', authenticateToken, addCollaborator);

export default router;
