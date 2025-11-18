import express from 'express';
import { updateAdminCredentials } from '../controllers/setupController';

const router = express.Router();

// Update admin credentials
router.post('/update-admin', updateAdminCredentials);

export default router;