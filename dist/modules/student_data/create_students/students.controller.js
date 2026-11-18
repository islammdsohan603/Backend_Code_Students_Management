import { studentsService } from "./students.service.js";
const createStudent = async (req, res) => {
    try {
        const students_Data = await studentsService.createStudentData(req.body);
        return res.status(200).json({
            success: true,
            message: "Students Data Create Successfully!",
            data: students_Data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getAllStudents = async (req, res) => {
    try {
        const studentsData = await studentsService.getStudents(req.body);
        return res.status(200).json({
            success: true,
            message: "Get All Students Data ",
            data: studentsData,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Get Single Student Data
const singleStudentsData = async (req, res) => {
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
    }
    catch (error) {
        console.error("Get Single Student Error:", error);
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
};
//# sourceMappingURL=students.controller.js.map