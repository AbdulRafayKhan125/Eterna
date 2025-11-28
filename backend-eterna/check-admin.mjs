import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './api/models/Admin.ts';

dotenv.config();

const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eterna-skincare');
    
    console.log('Connected to MongoDB');

    // Check for existing admin users
    const admins = await Admin.find({});
    console.log('Found admins:', admins.length);
    
    if (admins.length > 0) {
      admins.forEach((admin, index) => {
        console.log(`Admin ${index + 1}:`);
        console.log(`  Email: ${admin.email}`);
        console.log(`  Name: ${admin.name}`);
        console.log(`  ID: ${admin._id}`);
        console.log('');
      });
    } else {
      console.log('No admin users found in database');
    }
    
    // Check specific emails
    const oldAdmin = await Admin.findOne({ email: 'admin@eterna.com' });
    const newAdmin = await Admin.findOne({ email: 'eternabyayman@eterna.com' });
    
    console.log('Old admin (admin@eterna.com):', oldAdmin ? 'Found' : 'Not found');
    console.log('New admin (eternabyayman@eterna.com):', newAdmin ? 'Found' : 'Not found');
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin:', error);
    process.exit(1);
  }
};

checkAdmin();