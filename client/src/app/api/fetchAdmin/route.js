// src/app/api/fetchAdmin/route.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_db",
};

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Fetch admin data from the database
    const [rows] = await connection.execute(
      `SELECT * FROM admins WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      return new Response(JSON.stringify({ success: true, admin: rows[0] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: "Admin not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching admin from MySQL:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch admin credentials." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}