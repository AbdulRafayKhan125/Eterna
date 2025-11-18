import express from 'express';
import { login, loginValidation, verifyToken } from '../controllers/authController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', loginValidation, login);
router.get('/verify', authenticateToken, verifyToken);

export default router;
