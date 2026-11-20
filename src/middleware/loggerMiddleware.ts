import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/db.js";
const app = express();

const jwtSecret = process.env.JWT_SECRET;

// Custom Logger Middleware
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
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

  next();
};
