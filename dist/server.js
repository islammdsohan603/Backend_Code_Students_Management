import app from "./app";
import config from "./config/dbconnect";
const serverRun = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`Server is Running on PORT ${config.port}`);
        });
    }
    catch (error) {
        console.error("Server Startup Failed:", error);
    }
};
serverRun();
//# sourceMappingURL=server.js.map