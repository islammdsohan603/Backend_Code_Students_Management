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
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Time:", new Date().toISOString());

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  next();
};
