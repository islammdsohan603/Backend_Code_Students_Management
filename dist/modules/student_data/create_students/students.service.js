import bcrypt from "bcryptjs";
import { pool } from "../../../db/db.js";
// create students data
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
    const existingStudentEmail = await pool.query(`
    SELECT id FROM student_data
    WHERE email=$1
    `, [email]);
    if (existingStudentEmail.rows.length > 0) {
        throw new Error("This Email is Already Registered");
    }
    const hasedPassword = await bcrypt.hash(password, 12);
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

        RETURNING 
        name,
        email,
        age,
        department,
        marks

        `, [name, email, hasedPassword, age, department, marks]);
        return studentsData.rows[0];
    }
    catch (error) {
        console.error("Students Service data Error");
        throw error;
    }
};
// get all students data
const getStudents = async (palyoad) => {
    const studentsData = await pool.query(`
    
    SELECT 
    id,
    name,
    email,
    age,
    department,
    marks
    
    FROM student_data
    
    `);
    return studentsData.rows;
};
export const studentsService = {
    createStudentData,
    getStudents,
};
//# sourceMappingURL=students.service.js.map