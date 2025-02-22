// client/src/utils/db.js
import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// Global is used to prevent multiple instances of mongoose
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
