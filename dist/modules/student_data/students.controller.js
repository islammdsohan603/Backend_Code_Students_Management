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
export const students_controller = {
    createStudent,
};
//# sourceMappingURL=students.controller.js.map