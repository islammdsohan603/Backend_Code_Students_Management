import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/db.js";

import { type role } from "../modules/student_data/create_students/students.interface.js";

// User Roles

const jwtSecret = process.env.JWT_SECRET;

// Custom Auth Middleware
export const auth = (...roles: role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check if the token exist

    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "User not authorized!",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Use a Bearer token!",
      });
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, jwtSecret as string) as JwtPayload;
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token!",
      });
    }

    if (typeof decoded.email !== "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload!",
      });
    }

    const student = await pool.query(
      `
    
    SELECT * FROM student_data WHERE email=$1
    `,
      [decoded.email],
    );

    if (student.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const currentStudent = student.rows[0] as { role: role };

    if (roles.length > 0 && !roles.includes(currentStudent.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource!",
      });
    }

    req.currentStudent = {
      ...decoded,
      role: currentStudent.role,
    };
    next();
  };
};
