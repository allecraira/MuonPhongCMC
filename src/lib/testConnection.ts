import mongoose, { Schema, Document, Model } from 'mongoose';

let isConnected = false;

export const connectMongoDB = async (): Promise<boolean> => {
  try {
    if (isConnected) {
      console.log("✅ MongoDB already connected");
      return true;
    }

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect('mongodb+srv://allecraira:123@muonphongcmc.q0vnmrp.mongodb.net/', {
      dbName: 'muonphongcmc',
    });
    isConnected = true;""
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    isConnected = false;
    return false;
  }
};