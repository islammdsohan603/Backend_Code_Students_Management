import bcrypt from "bcryptjs";
import { pool } from "../../../db/db.js";
import type { IStudents, IUpdateStudent } from "./students.interface.js";
// create students data
const createStudentData = async (payload: IStudents) => {
  const { name, email, password, age, department, marks, role } = payload;

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

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const studentsData = await pool.query(
      `
        
       INSERT INTO student_data (
       
        name,
        email,
        password,
        age,
        department,
        marks,
        role

       )
        VALUES ($1,$2,$3,$4,$5,$6,$7)

        RETURNING 
        name,
        email,
        age,
        department,
        marks,
        role

        `,
      [name, email, hashedPassword, age, department, marks, role],
    );

    return studentsData.rows[0];
  } catch (error) {
    console.error("Create Student Database Error:", error);
    throw error;
  }
};
// get all students data
const getStudents = async () => {
  const studentsData = await pool.query(`
    
    SELECT 
    id,
    name,
    email,
    age,
    department,
    marks,
    role
    
    FROM student_data
    
    `);

  return studentsData.rows;
};

// get single students data

const singleStudentsData = async (id: string) => {
  const studentData = await pool.query(
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

  return studentData.rows[0];
};

// Update Single Student Data
const updateStudentData = async (id: string, payload: IUpdateStudent) => {
  const {
    name,
    email,
    password,
    age,
    department,
    marks,
    bio,
    address,
    father_name,
    mother_name,
    parents_mobile_number,
  } = payload;

  // Hash Password Only When Password Is Provided
  const hashedPassword = password ? await bcrypt.hash(password, 12) : null;

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

        -- Optional Personal Information
        bio = COALESCE($8, bio),
        address = COALESCE($9, address),
        father_name = COALESCE($10, father_name),
        mother_name = COALESCE($11, mother_name),
        parents_mobile_number = COALESCE($12, parents_mobile_number),

        updated_at = NOW()

      WHERE id = $1

      RETURNING
        id,
        name,
        email,
        age,
        department,
        marks,
        bio,
        address,
        father_name,
        mother_name,
        parents_mobile_number,
        created_at,
        updated_at
    `,
    [
      id,
      name ?? null,
      email ?? null,
      hashedPassword,
      age ?? null,
      department ?? null,
      marks ?? null,
      bio ?? null,
      address ?? null,
      father_name ?? null,
      mother_name ?? null,
      parents_mobile_number ?? null,
    ],
  );

  return updatedData.rows[0];
};

// deleted students data

const deletedStudentData = async (id: string) => {
  const deletedStudent = await pool.query(
    `
    DELETE FROM student_data
    WHERE id=$1
    RETURNING *
    `,
    [id],
  );

  return deletedStudent.rows[0];
};

export const studentsService = {
  createStudentData,
  getStudents,
  singleStudentsData,
  updateStudentData,
  deletedStudentData,
};
