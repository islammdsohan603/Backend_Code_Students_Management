import app from "./app.js";
import { config } from "./config/dbconnect.js";

const server = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Student Management System Server is `);
    });
  } catch (error) {
    console.log("Server Error", error);
  }
};
