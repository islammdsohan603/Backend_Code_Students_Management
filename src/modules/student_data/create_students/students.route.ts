import { Router } from "express";

import { auth } from "../../../middleware/auth.js";
import { students_controller } from "./students.controller.js";
import { StudentRole } from "./students.interface.js";

const router = Router();

router.post("/", auth(StudentRole.admin), students_controller.createStudent);

router.get(
  "/",
  auth(StudentRole.admin, StudentRole.teacher, StudentRole.student),
  students_controller.getAllStudents,
);

router.get(
  "/:id",
  auth(StudentRole.admin, StudentRole.teacher),
  students_controller.singleStudentsData,
);

router.put(
  "/:id",
  auth(StudentRole.admin),
  students_controller.updateStudentData,
);

router.delete(
  "/:id",
  auth(StudentRole.admin),
  students_controller.deletedStudentData,
);

export const studentsRouter = router;
