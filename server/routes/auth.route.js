import express from 'express';
import { handleUserLogin, handleUserSignOut, handleUserSignup } from '../controllers/auth.controllers.js';


const router = express.Router();

router.post('/signup', handleUserSignup);

router.post('/signin', handleUserLogin);

router.get('/signout', handleUserSignOut);

export default router;