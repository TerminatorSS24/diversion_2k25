// db.js
import mysql from "mysql2/promise";

// MySQL database configuration
const dbConfig = {
  host: "localhost",
  user: "root", // Default XAMPP MySQL username
  password: "", // Default XAMPP MySQL password (empty)
};

// Database and table names
const databaseName = "admin_db";
const tableName = "admins";

/**
 * Initialize the database and tables if they don't exist.
 */
const initializeDatabase = async () => {
  try {
    // Create a connection to the MySQL server (without specifying a database)
    const connection = await mysql.createConnection(dbConfig);

    // Check if the database exists
    const [databases] = await connection.execute(`SHOW DATABASES LIKE ?`, [databaseName]);

    if (databases.length === 0) {
      // Create the database if it doesn't exist
      await connection.execute(`CREATE DATABASE ${databaseName}`);
      console.log(`✅ Database '${databaseName}' created successfully!`);
    }

    // Switch to the newly created or existing database
    await connection.changeUser({ database: databaseName });

    // Check if the table exists
    const [tables] = await connection.execute(`SHOW TABLES LIKE ?`, [tableName]);

    if (tables.length === 0) {
      // Create the table if it doesn't exist
      await connection.execute(`
        CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          walletAddress VARCHAR(255) NOT NULL
        )
      `);
      console.log(`✅ Table '${tableName}' created successfully!`);
    }

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
};

/**
 * Store admin credentials in the MySQL database.
 * @param {Object} data - The admin data to be stored.
 * @returns {Object} - The result of the database operation.
 */
export const storeAdminCredentials = async (data) => {
  const { email, password, walletAddress } = data;

  try {
    // Initialize the database and tables if they don't exist
    await initializeDatabase();

    // Create a connection to the database
    const connection = await mysql.createConnection({ ...dbConfig, database: databaseName });

    // Insert admin data into the database
    const [result] = await connection.execute(
      `INSERT INTO ${tableName} (email, password, walletAddress) VALUES (?, ?, ?)`,
      [email, password, walletAddress]
    );

    console.log("✅ Admin stored in MySQL successfully!");
    return { success: true, message: "Admin registered successfully!" };
  } catch (error) {
    console.error("❌ Error storing admin in MySQL:", error);
    throw new Error("Failed to store admin credentials.");
  }
};

/**
 * Fetch admin credentials from the MySQL database.
 * @param {string} email - The email of the admin to fetch.
 * @returns {Object} - The admin data.
 */
export const fetchAdminCredentials = async (email) => {
  try {
    // Initialize the database and tables if they don't exist
    await initializeDatabase();

    // Create a connection to the database
    const connection = await mysql.createConnection({ ...dbConfig, database: databaseName });

    // Fetch admin data from the database
    const [rows] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      console.log("✅ Admin fetched from MySQL:", rows[0]);
      return rows[0];
    } else {
      console.error("❌ Admin not found in MySQL.");
      throw new Error("Admin not found.");
    }
  } catch (error) {
    console.error("❌ Error fetching admin from MySQL:", error);
    throw error;
  }
};