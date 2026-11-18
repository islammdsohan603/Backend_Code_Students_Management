import type { Request, Response } from "express";
import { studentsService } from "./students.service.js";
 

const createStudent = async (req: Request, res: Response) => {
  try {
    const students_Data = await studentsService.createStudentData(req.body);
    return res.status(200).json({
      success: true,
      message: "Students Data Create Successfully!",
      data: students_Data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const students_controller = {
  createStudent,
};
