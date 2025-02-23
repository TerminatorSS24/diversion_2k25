// src/app/api/storeAdmin/route.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root", // Default XAMPP MySQL username
  password: "", // Default XAMPP MySQL password (empty)
  database: "admin_db", // Replace with your database name
};

export async function POST(request) {
  try {
    // Parse the request body
    const { email, password, walletAddress } = await request.json();

    // Validate input data
    if (!email || !password || !walletAddress) {
      throw new Error("Missing required fields: email, password, or walletAddress");
    }

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Insert admin data into the database
    const [result] = await connection.execute(
      `INSERT INTO admins (email, password, walletAddress) VALUES (?, ?, ?)`,
      [email, password, walletAddress]
    );

    // Close the connection
    await connection.end();

    console.log("✅ Admin stored in MySQL successfully!");
    return new Response(JSON.stringify({ success: true, message: "Admin registered successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error in storeAdmin API route:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to store admin credentials.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}