import { Router } from "express";
import { students_controller } from "./students.controller.js";

const router = Router();

router.post("/", students_controller.createStudent);

router.get("/", students_controller.getAllStudents);

export const studentsRouter = router;
