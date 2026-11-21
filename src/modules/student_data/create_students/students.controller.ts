import type { Request, Response } from "express";
import type { IUpdateStudent } from "./students.interface.js";
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
    console.error("Create Student Error:", error);

    if (error instanceof Error && error.message === "This Email is Already Registered") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error instanceof Error && error.message === "All Student Data Is Required") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const studentsData = await studentsService.getStudents();

    return res.status(200).json({
      success: true,
      message: "Get All Students Data ",
      data: studentsData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Single Student Data

const singleStudentsData = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const studentData = await studentsService.singleStudentsData(id);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single Student Data Retrieved Successfully!",
      data: studentData,
    });
  } catch (error) {
    console.error("Get Single Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateStudentData = async (
  req: Request<{ id: string }, {}, IUpdateStudent>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const updatedData = await studentsService.updateStudentData(id, req.body);

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student Data Updated Successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// deleted Students data
const deletedStudentData = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const studentData = await studentsService.deletedStudentData(id);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Students Data Deleted Successfully",
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
  getAllStudents,
  singleStudentsData,
  updateStudentData,
  deletedStudentData,
};
