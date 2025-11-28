import express from 'express';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts,
  productValidation 
} from '../controllers/productController';
import authenticateToken from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

// Protected routes (admin only)
router.post('/', authenticateToken, productValidation, createProduct);
router.put('/:id', authenticateToken, productValidation, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;