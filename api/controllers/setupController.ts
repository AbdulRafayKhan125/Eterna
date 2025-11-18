import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

export const updateAdminCredentials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Find existing admin
    const existingAdmin = await Admin.findOne({ email: 'admin@eterna.com' });
    
    if (existingAdmin) {
      // Update existing admin
      existingAdmin.email = email;
      existingAdmin.password = await bcrypt.hash(password, 10);
      await existingAdmin.save();
      
      res.json({
        success: true,
        message: 'Admin credentials updated successfully',
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name
        }
      });
    } else {
      // Create new admin if none exists
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({
        email,
        password: hashedPassword,
        name: 'Eterna Admin'
      });
      
      await admin.save();
      
      res.json({
        success: true,
        message: 'Admin user created successfully',
        admin: {
          email: admin.email,
          name: admin.name
        }
      });
    }
  } catch (error) {
    console.error('Update admin credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};