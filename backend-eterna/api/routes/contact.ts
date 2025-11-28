import express from 'express';
import { createContact, getContacts, contactValidation } from '../controllers/contactController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/whatsapp-group', contactValidation, createContact);

// Protected routes (admin only)
router.get('/', authenticateToken, getContacts);

export default router;