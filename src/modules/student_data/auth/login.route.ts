import { Router } from "express";
import { studentLogin_Controller } from "./login.controller.js";

const router = Router();

// Login
router.post("/", studentLogin_Controller.logInStudent);

// Refresh Access Token
router.post("/refresh", studentLogin_Controller.refreshAccessToken);

// Logout
router.post("/logout", studentLogin_Controller.logOutStudent);

export const students_login = router;
