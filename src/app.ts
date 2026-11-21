import express, { type Request, type Response } from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { students_login } from "./modules/student_data/auth/login.route.js";
import { studentsRouter } from "./modules/student_data/create_students/students.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())

app.use(loggerMiddleware);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next) => {
  return res.status(200).json({
    success: true,
    message: "Student Management System Server Running Now",
  });
});

// Student Routes
app.use("/api/students", studentsRouter);

// login routes

app.use("/api/login", students_login);

// Return a clear response when the client sends invalid JSON.

app.use(globalErrorHandler);

export default app;
