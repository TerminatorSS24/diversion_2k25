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
    const { walletAddress, password } = await request.json();

    // Validate input data
    if (!walletAddress || !password) {
      throw new Error("Missing required fields: walletAddress or password");
    }

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Fetch admin data from the database
    const [rows] = await connection.execute(
      `SELECT * FROM admins WHERE walletAddress = ? AND password = ?`,
      [walletAddress, password]
    );

    // Close the connection
    await connection.end();

    // If a matching admin is found, return success
    if (rows.length > 0) {
      return new Response(JSON.stringify({ success: true, message: "Admin verified successfully!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials or not an admin." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("❌ Error in verifyAdmin API route:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to verify admin credentials.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}