import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eterna-skincare';
    
    await mongoose.connect(mongoURI, {
      dbName: 'eterna',
      serverSelectionTimeoutMS: 15000,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
