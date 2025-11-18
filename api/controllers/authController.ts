import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Admin from '../models/Admin';
import { body, validationResult } from 'express-validator';

// Mock admin for testing when MongoDB is not available
const MOCK_ADMIN = {
  _id: 'mock-admin-id-12345',
  email: 'eternabyayman@eterna.com',
  name: 'Eterna Admin',
  password: '$2a$10$cTpGlb9Pe1KHMhLIDQktHueR5rPkNtcnAm8jxQ4juVTGkx65xJnXi' // bcrypt hash for 'eterna@123!'
};

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        message: 'Validation errors',
        errors: errors.array() 
      });
      return;
    }

    const { email, password } = req.body;

    // First, try to find a real admin in the database
    try {
      const admin = await Admin.findOne({ email });
      if (admin) {
        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
          });
          return;
        }

        // Generate JWT token
        const token = jwt.sign(
          { 
            id: admin._id, 
            email: admin.email 
          },
          process.env.JWT_SECRET || 'fallback-secret-key',
          { expiresIn: '7d' }
        );

        res.json({
          success: true,
          message: 'Login successful',
          token,
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name
          }
        });
        return;
      }
    } catch (dbError) {
      console.log('Database not available, using mock admin');
    }

    // If database is not available or admin not found, check mock admin
    if (email === MOCK_ADMIN.email) {
      // For mock admin, compare password with the hashed version
      const isMatch = await bcrypt.compare(password, MOCK_ADMIN.password);
      if (isMatch) {
        // Generate JWT token
        const token = jwt.sign(
          { 
            id: MOCK_ADMIN._id, 
            email: MOCK_ADMIN.email 
          },
          process.env.JWT_SECRET || 'fallback-secret-key',
          { expiresIn: '7d' }
        );

        res.json({
          success: true,
          message: 'Login successful',
          token,
          admin: {
            id: MOCK_ADMIN._id,
            email: MOCK_ADMIN.email,
            name: MOCK_ADMIN.name
          }
        });
        return;
      }
    }

    // If we get here, credentials are invalid
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any;
    
    // First try to find a real admin
    try {
      const admin = await Admin.findById(decoded.id);
      if (admin) {
        res.json({
          success: true,
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name
          }
        });
        return;
      }
    } catch (dbError) {
      console.log('Database not available for token verification');
    }

    // If database is not available, check if this is our mock admin token
    if (decoded.id === MOCK_ADMIN._id) {
      res.json({
        success: true,
        admin: {
          id: MOCK_ADMIN._id,
          email: MOCK_ADMIN.email,
          name: MOCK_ADMIN.name
        }
      });
      return;
    }

    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};