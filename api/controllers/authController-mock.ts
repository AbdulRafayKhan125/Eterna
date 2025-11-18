import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Temporary mock admin for testing when MongoDB is not available
const MOCK_ADMIN = {
  _id: 'mock-admin-id',
  email: 'eternabyayman@eterna.com',
  name: 'Eterna Admin',
  password: 'eterna@123!' // In real scenario, this would be hashed
};

export const loginValidation = [
  // Validation middleware
];

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if this is our mock admin credentials
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
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

    // If not mock admin, try to use the real database
    // For now, return invalid credentials
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
    
    // Check if this is our mock admin token
    if (decoded.id === MOCK_ADMIN._id) {
      res.json({
        success: true,
        admin: MOCK_ADMIN
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