import { pool } from "../../db/db.js";
const createStudentData = async (palyoad) => {
    const { name, email, password, age, department, marks } = palyoad;
    if (!name?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !department?.trim() ||
        age == null ||
        marks == null) {
        throw new Error("All Student Data Is Required");
    }
    try {
        const studentsData = await pool.query(`
        
       INSERT INTO student_data (
       
        name,
        email,
        password,
        age,
        department,
        marks

       )
        VALUES ($1,$2,$3,$4,$5,$6)

        RETURNING *

        `, [name, email, password, age, department, marks]);
        return studentsData.rows;
    }
    catch (error) {
        console.error("Students Service data Error");
        throw error;
    }
};
export const studentsService = {
    createStudentData,
};
//# sourceMappingURL=students.service.js.map