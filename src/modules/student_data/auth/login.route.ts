import { Router } from "express";
import { studentLogin_Controller } from "./login.controller.js";

const router = Router();

router.post("/", studentLogin_Controller.logInStudent);

export const students_login = router;
