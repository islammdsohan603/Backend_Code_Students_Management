import { Router } from "express";

import { auth } from "../../../middleware/auth.js";
import { students_controller } from "./students.controller.js";

const router = Router();

router.post("/", students_controller.createStudent);

router.get("/", auth("admin", "student"), students_controller.getAllStudents);

router.get("/:id", auth("admin", "student"), students_controller.singleStudentsData);

router.put("/:id", auth("admin"), students_controller.updateStudentData);

router.delete("/:id", auth("admin"), students_controller.deletedStudentData);

export const studentsRouter = router;
