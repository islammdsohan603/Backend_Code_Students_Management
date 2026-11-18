import { Pool } from "pg";
import { config } from "../config/dbconnect.js";

export const pool = new Pool({
  connectionString: config.dataBaseUrl,
});

export const Database = () => {
  try {
    console.log("DataBase Create Successfull!");
  } catch (error) {
    console.log("DataBase initialization Failed", error);
  }
};
