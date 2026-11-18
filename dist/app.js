import express, {} from "express";
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Students Management Server Running",
    });
});
export default app;
//# sourceMappingURL=app.js.map