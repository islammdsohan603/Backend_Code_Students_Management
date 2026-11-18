import { Router } from "express";
import { students_controller } from "./students.controller.js";

const router = Router();

router.post("/", students_controller.createStudent);

router.get("/", students_controller.getAllStudents);

router.get("/:id", students_controller.singleStudentsData);

router.put("/:id", students_controller.updateStudentData);

export const studentsRouter = router;
