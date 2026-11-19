import { Pool } from "pg";
import { config } from "../config/dbconnect.js";

export const pool = new Pool({
  connectionString: config.dataBaseUrl,
});

export const Database = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        department VARCHAR(100) NOT NULL,
        marks DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`

      ALTER TABLE student_data
      ADD COLUMN IF NOT EXISTS marks DECIMAL(5,2) NOT NULL DEFAULT 0;
      
      `);

    await pool.query(`
        
        ALTER TABLE student_data
        ADD COLUMN IF NOT EXISTS bio TEXT,
        ADD COLUMN IF NOT EXISTS address TEXT,
        ADD COLUMN IF NOT EXISTS father_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS mother_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS parents_mobile_number VARCHAR(20); 


        `);

    console.log("Database Table Created Successfully!");
  } catch (error) {
    console.error("Database Initialization Failed:", error);
    throw error;
  }
};
