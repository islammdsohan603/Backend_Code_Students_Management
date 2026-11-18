import bcrypt from "bcryptjs";
import { pool } from "../../../db/db.js";
import type { IStudents, IUpdateStudent } from "./students.interface.js";
// create students data
const createStudentData = async (palyoad: IStudents) => {
  const { name, email, password, age, department, marks } = palyoad;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !department?.trim() ||
    age == null ||
    marks == null
  ) {
    throw new Error("All Student Data Is Required");
  }

  const existingStudentEmail = await pool.query(
    `
    SELECT id FROM student_data
    WHERE email=$1
    `,
    [email],
  );

  if (existingStudentEmail.rows.length > 0) {
    throw new Error("This Email is Already Registered");
  }

  const hasedPassword = await bcrypt.hash(password, 12);

  try {
    const studentsData = await pool.query(
      `
        
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

        `,
      [name, email, hasedPassword, age, department, marks],
    );

    return studentsData.rows[0];
  } catch (error) {
    console.error("Students Service data Error");
    throw error;
  }
};
// get all students data
const getStudents = async (palyoad: IStudents) => {
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

// get single students data

const singleStudentsData = async (id: string) => {
  const studentdData = await pool.query(
    `
    
    SELECT 
    
    id,
    name,
    email,
    age,
    department,
    marks

    FROM student_data
    WHERE id =$1

    `,
    [id],
  );

  return studentdData.rows[0];
};

 
 // Update Single Student Data

const updateStudentData = async (
  id: string,
  payload: IUpdateStudent
) => {
  const { name, email, password, age, department, marks } = payload;

  // Hash Password Only When Password Is Provided
  const hashedPassword = password
    ? await bcrypt.hash(password, 12)
    : null;

  const updatedData = await pool.query(
    `
      UPDATE student_data
      SET
        name = COALESCE($2, name),
        email = COALESCE($3, email),
        password = COALESCE($4, password),
        age = COALESCE($5, age),
        department = COALESCE($6, department),
        marks = COALESCE($7, marks),
        updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        name,
        email,
        age,
        department,
        marks,
        created_at,
        updated_at
    `,
    [
      id,
      name,
      email,
      hashedPassword,
      age,
      department,
      marks,
    ]
  );

  return updatedData.rows[0];
};


export const studentsService = {
  createStudentData,
  getStudents,
  singleStudentsData,
  updateStudentData,
};
