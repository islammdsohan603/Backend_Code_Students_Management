import type { JwtPayload } from "jsonwebtoken";
import type { UserRole } from "./auth.js";

declare global {
  namespace Express {
    interface Request {
      currentStudent?: JwtPayload & { role: UserRole };
    }
  }
}
