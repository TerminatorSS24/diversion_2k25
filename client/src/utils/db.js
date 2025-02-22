import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// Global cache to prevent multiple database connections
let cachedClient = null;
let cachedDb = null;

async function connectDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbName = new URL(MONGODB_URI).pathname.substring(1); // Extracts DB name from URI
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    console.log("✅ Connected to MongoDB via mongosh");
    return { client, db };
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed!");
  }
}

export default connectDB;
