import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠️ MONGO_URI or MONGODB_URI not found in environment variables. Set MONGO_URI in Render environment settings.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};
