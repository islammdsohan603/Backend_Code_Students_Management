import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { pool } from "../../../db/db.js";

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret || !jwtRefreshSecret) {
  throw new Error("JWT Secrets are missing!");
}

// Student Login Service
const studentLogin_Service = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  // Find Student
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
    role: student.role,
  };

  // Generate Access Token
  const accessToken = jwt.sign(
    {
      ...jwtPayload,
      tokenType: "access",
    },
    jwtSecret,
    {
      expiresIn: "30m",
    },
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    {
      sub: String(student.id),
      tokenType: "refresh",
    },
    jwtRefreshSecret,
    {
      expiresIn: "3d",
    },
  );

  return {
    accessToken,
    refreshToken,

    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      age: student.age,
      department: student.department,
      marks: student.marks,
      role: student.role,
    },
  };
};

// Refresh Access Token Service
const refreshAccessToken_Service = async (refreshToken: string) => {
  // Verify Refresh Token
  let decoded: jwt.JwtPayload;

  try {
    const payload = jwt.verify(refreshToken, jwtRefreshSecret);

    if (
      typeof payload === "string" ||
      payload.tokenType !== "refresh" ||
      typeof payload.sub !== "string"
    ) {
      return null;
    }

    decoded = payload;
  } catch {
    return null;
  }

  // Find Current User From Database
  const students = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      age,
      department,
      marks,
      role
    FROM student_data
    WHERE id = $1
    `,
    [decoded.sub],
  );

  const student = students.rows[0];

  if (!student) {
    return null;
  }

  // Generate New Access Token
  const accessToken = jwt.sign(
    {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
      tokenType: "access",
    },
    jwtSecret,
    {
      expiresIn: "30m",
    },
  );

  return {
    accessToken,
    student,
  };
};

export const studentsLogin_Services = {
  studentLogin_Service,
  refreshAccessToken_Service,
};
