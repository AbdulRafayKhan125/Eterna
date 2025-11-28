import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin';

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eterna-skincare');
    
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'eternabyayman@eterna.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
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
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();