import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/db.js";

// User Roles
type UserRole = "admin" | "student";

const jwtSecret = process.env.JWT_SECRET;

// Custom Auth Middleware
export const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check if the token exist

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user not authorized !",
      });
    }

    const decode = jwt.verify(token, jwtSecret as string) as JwtPayload;

    const student = await pool.query(
      `
    
    SELECT * FROM student_data WHERE email=$1
    `,
      [decode.email],
    );

    if (student.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    req.currentStudent = decode;

    next();
  };
};
