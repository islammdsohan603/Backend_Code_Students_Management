import express, { type Request, type Response } from "express";
import { students_login } from "./modules/student_data/auth/login.route.js";
import { studentsRouter } from "./modules/student_data/create_students/students.route.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Student Management System Server Running Now",
  });
});

// Student Routes
app.use("/api/students", studentsRouter);

// login routes

app.use("/api/login", students_login);

export default app;
