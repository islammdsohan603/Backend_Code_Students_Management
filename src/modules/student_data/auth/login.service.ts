import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { pool } from "../../../db/db.js";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is missing!");
}

const studentLogin_Service = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  // Find Student By Email
  const students = await pool.query(
    `
      SELECT *
      FROM student_data
      WHERE email = $1
    `,
    [email],
  );

  const student = students.rows[0];

  if (!student) {
    return null;
  }

  // Check Password
  const matchPassword = await bcrypt.compare(password, student.password);

  if (!matchPassword) {
    return null;
  }

  // JWT Payload
  const jwtPayload = {
    id: student.id,
    name: student.name,
    email: student.email,
  };

  // Generate JWT Token
  const accessToken = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: "10m",
    algorithm: "HS256",
  });

  // Return Token and Student Data

  return {
    accessToken,
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      age: student.age,
      department: student.department,
      marks: student.marks,
    },
  };
};

export const studentsLogin_Services = {
  studentLogin_Service,
};
