import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('❌ MONGO_URI or MONGODB_URI not found in environment variables.');
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};
