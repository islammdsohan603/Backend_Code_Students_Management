import { Router } from "express";
import { students_controller } from "./students.controller.js";
const router = Router();
router.post("/", students_controller.createStudent);
export const studentsRouter = router;
//# sourceMappingURL=students.route.js.map