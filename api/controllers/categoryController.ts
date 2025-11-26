import { Request, Response } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';
import { body, validationResult } from 'express-validator';

export const categoryValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
];

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ status: 'active' }).sort({ name: 1 });
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
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

    const { name, description, status = 'active' } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      res.status(400).json({ 
        success: false, 
        message: 'Category already exists' 
      });
      return;
    }

    const category = new Category({
      name: name.trim(),
      description: description?.trim(),
      status
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
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
    const { name, description, status } = req.body;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
      return;
    }

    // Check if new name conflicts with existing category
    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: name.trim(), 
        _id: { $ne: id } 
      });
      if (existingCategory) {
        res.status(400).json({ 
          success: false, 
          message: 'Category name already exists' 
        });
        return;
      }
    }

    // Update category
    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description?.trim();
    if (status) category.status = status;

    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
      return;
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: id });
    
    if (productCount > 0) {
      res.status(400).json({ 
        success: false, 
        message: `Cannot delete category. ${productCount} products are associated with this category.` 
      });
      return;
    }

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.json({ success: true, category });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
