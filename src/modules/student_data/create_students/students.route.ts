import { Router } from "express";

import { auth } from "../../../middleware/auth.js";
import { students_controller } from "./students.controller.js";

const router = Router();

router.post("/", students_controller.createStudent);

router.get("/", auth("admin", "student"), students_controller.getAllStudents);

router.get("/:id", students_controller.singleStudentsData);

router.put("/:id", students_controller.updateStudentData);

router.delete("/:id", students_controller.deletedStudentData);

export const studentsRouter = router;
