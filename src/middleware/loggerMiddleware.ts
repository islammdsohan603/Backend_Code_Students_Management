import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
const app = express();

// Custom Logger Middleware
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
