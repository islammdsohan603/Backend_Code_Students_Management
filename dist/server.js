import app from "./app.js";
import { config } from "./config/dbconnect.js";
import { Database } from "./db/db.js";
const server = async () => {
    try {
        await Database();
        app.listen(config.port, () => {
            console.log(`Student Management System Server is ${config.port}`);
        });
    }
    catch (error) {
        console.log("Server Error", error);
    }
};
server();
//# sourceMappingURL=server.js.map