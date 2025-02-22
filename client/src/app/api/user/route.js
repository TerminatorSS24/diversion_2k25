import { NextResponse } from "next/server";
import connectDB from "@/utils/db";  // Ensure this is the correct path
import mongoose from "mongoose";

// Define a simple Mongoose schema for testing
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("✅ MongoDB connected successfully!");

    // Create a test document
    const testUser = new User({ name: "John Doe" });
    await testUser.save();

    return NextResponse.json({ message: "DB connection successful! User saved." }, { status: 200 });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    return NextResponse.json({ message: "DB connection failed!", error: error.message }, { status: 500 });
  }
}
