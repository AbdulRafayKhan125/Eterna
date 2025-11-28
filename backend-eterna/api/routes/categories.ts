import express from 'express';
import { 
  getCategories, 
  getAllCategories, 
  getCategory,
  createCategory, 
  updateCategory, 
  deleteCategory,
  categoryValidation 
} from '../controllers/categoryController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCategories);

// Protected routes (admin only)
router.get('/all', authenticateToken, getAllCategories);
router.get('/:id', authenticateToken, getCategory);
router.post('/', authenticateToken, categoryValidation, createCategory);
router.put('/:id', authenticateToken, categoryValidation, updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

export default router;
