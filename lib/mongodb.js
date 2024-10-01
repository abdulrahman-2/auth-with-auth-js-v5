import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectDB() {
  if (isConnected) {
    if (process.env.NODE_ENV !== "production") {
      console.log("connected to MongoDB");
    }
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO); // No need for deprecated options
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
}
