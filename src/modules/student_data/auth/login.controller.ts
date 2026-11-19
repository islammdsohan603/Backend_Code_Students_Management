import type { Request, Response } from "express";
import { studentsLogin_Services } from "./login.service.js";

const logInStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentsLogin_Services.studentLogin_Service(req.body);

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const studentLogin_Controller = {
  logInStudent,
};
