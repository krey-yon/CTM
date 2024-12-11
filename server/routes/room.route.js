import express from 'express';
import { createRoom, joinRoom } from '../controllers/room.controllers.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticateToken, createRoom);
router.post('/join', authenticateToken, joinRoom);

export default router;
