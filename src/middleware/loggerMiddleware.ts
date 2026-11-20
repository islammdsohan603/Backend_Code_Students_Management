import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
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
