import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin';

dotenv.config();

const updateAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eterna-skincare');
    
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@eterna.com' });
    if (existingAdmin) {
      console.log('Found existing admin, updating credentials...');
      
      // Update the existing admin
      existingAdmin.email = 'eternabyayman@eterna.com';
      existingAdmin.password = await bcrypt.hash('eterna@123!', 10);
      existingAdmin.name = 'Eterna Admin';
      
      await existingAdmin.save();
      console.log('Admin credentials updated successfully');
      console.log('New Email: eternabyayman@eterna.com');
      console.log('New Password: eterna@123!');
    } else {
      // Create new admin if none exists
      const hashedPassword = await bcrypt.hash('eterna@123!', 10);
      const admin = new Admin({
        email: 'eternabyayman@eterna.com',
        password: hashedPassword,
        name: 'Eterna Admin'
      });

      await admin.save();
      console.log('Admin user created successfully');
      console.log('Email: eternabyayman@eterna.com');
      console.log('Password: eterna@123!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin:', error);
    process.exit(1);
  }
};

updateAdmin();