import { Router } from "express";
import { students_controller } from "./students.controller.js";
const router = Router();
router.post("/", students_controller.createStudent);
router.get("/", students_controller.getAllStudents);
router.get("/:id", students_controller.singleStudentsData);
export const studentsRouter = router;
//# sourceMappingURL=students.route.js.map