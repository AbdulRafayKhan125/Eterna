import { Request, Response } from 'express';
import multer from 'multer';
import Product from '../models/Product';
import Category from '../models/Category';
import { body, validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';

export const productValidation = [
  body('name').trim().isLength({ min: 1, max: 200 }).withMessage('Name must be between 1 and 200 characters'),
  body('description').trim().isLength({ min: 1, max: 2000 }).withMessage('Description must be between 1 and 2000 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number').toFloat(),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('ingredients').optional().trim().isLength({ max: 1000 }).withMessage('Ingredients must be less than 1000 characters'),
  body('usage').optional().trim().isLength({ max: 500 }).withMessage('Usage must be less than 500 characters'),
  body('featured').optional().custom((val) => val === true || val === false || val === 'true' || val === 'false').withMessage('Featured must be boolean'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
];

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      featured,
      search,
      status = 'active' 
    } = req.query;

    const query: any = { status };
    
    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Add featured filter
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Add search filter
    if (search) {
      query.$text = { $search: search as string };
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Get products with category information
    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id).populate('category', 'name');
    
    if (!product) {
      res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
      return;
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        message: 'Validation errors',
        errors: errors.array() 
      });
      return;
    }

    const { name, description, price, category, ingredients, usage, featured = false, status = 'active' } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ 
        success: false, 
        message: 'Category not found' 
      });
      return;
    }

    // Handle images: accept pre-uploaded image paths from body
    let images: string[] = [];
    if (Array.isArray((req as any).files) && (req as any).files.length > 0) {
      images = (req as any).files.map((file: any) => `/uploads/products/${file.filename}`);
    } else if (Array.isArray((req.body as any).images)) {
      images = (req.body as any).images;
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      images,
      ingredients: ingredients?.trim(),
      usage: usage?.trim(),
      featured: featured === 'true' || featured === true,
      status
    });

    await product.save();

    // Populate category before sending response
    await product.populate('category', 'name');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        message: 'Validation errors',
        errors: errors.array() 
      });
      return;
    }

    const { id } = req.params;
    const { name, description, price, category, ingredients, usage, featured, status } = req.body;

    // Find existing product
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
      return;
    }

    // Verify category exists if category is being updated
    if (category && category !== product.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(400).json({ 
          success: false, 
          message: 'Category not found' 
        });
        return;
      }
    }

    // Handle images (replace if provided)
    let images = product.images;
    if (Array.isArray((req as any).files) && (req as any).files.length > 0) {
      // Delete old images from disk
      product.images.forEach(imagePath => {
        const fullPath = path.join(process.cwd(), imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
      images = (req as any).files.map((file: any) => `/uploads/products/${file.filename}`);
    } else if (Array.isArray((req.body as any).images)) {
      images = (req.body as any).images;
    }

    // Update product
    if (name) product.name = name.trim();
    if (description) product.description = description.trim();
    if (price) product.price = parseFloat(price);
    if (category) product.category = category;
    if (ingredients !== undefined) product.ingredients = ingredients?.trim();
    if (usage !== undefined) product.usage = usage?.trim();
    if (featured !== undefined) product.featured = featured === 'true' || featured === true;
    if (status) product.status = status;
    if (images) product.images = images;

    await product.save();

    // Populate category before sending response
    await product.populate('category', 'name');

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
      return;
    }

    // Delete product images
    product.images.forEach(imagePath => {
      const fullPath = path.join(process.cwd(), imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ featured: true, status: 'active' })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};