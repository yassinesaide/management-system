// Script to create an admin user
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

interface AdminUser {
  username: string;
  password: string;
  email: string;
  full_name: string;
  role: string;
}

async function createAdminUser(): Promise<void> {
  try {
    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "school_management",
    });

    console.log("Connected to database");

    // Check if admin user already exists
    const [existingUsers] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      ["adminuser", "admin@school.com"]
    );

    if (existingUsers.length > 0) {
      console.log("Admin user already exists");
      await connection.end();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Admin user data
    const adminUser: AdminUser = {
      username: "adminuser",
      password: hashedPassword,
      email: "admin@school.com",
      full_name: "System Administrator",
      role: "admin",
    };

    // Insert admin user
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      "INSERT INTO users (username, password, email, full_name, role) VALUES (?, ?, ?, ?, ?)",
      [
        adminUser.username,
        adminUser.password,
        adminUser.email,
        adminUser.full_name,
        adminUser.role,
      ]
    );

    console.log(`Admin user created with ID: ${result.insertId}`);

    // Close connection
    await connection.end();
    console.log("Done");
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

// Execute the function
createAdminUser(); 