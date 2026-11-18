import { Pool } from "pg";
import config from "../config/dbconnect";
// database Connection
export const pool = new Pool({
    connectionString: config.databaseUrl,
});
pool.on("error", (error) => {
    console.error("Unexpected Database Error:", error);
});
export const initDataBase = () => {
    try {
        console.log("Database Tables Created Successfully!");
    }
    catch (error) {
        console.error("Database Initialization Failed:", error);
        throw error;
    }
};
//# sourceMappingURL=db.js.map