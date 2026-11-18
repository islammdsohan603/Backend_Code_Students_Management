import express, {} from "express";
import { studentsRouter } from "./modules/student_data/students.route.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Student Management System Server Running Now",
    });
});
// Student Routes
app.use("/api/students", studentsRouter);
export default app;
//# sourceMappingURL=app.js.map