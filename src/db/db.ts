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
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
  

  );

    console.log("Database Table Created Successfully!");
  } catch (error) {
    console.error("Database Initialization Failed:", error);
    throw error;
  }
};
