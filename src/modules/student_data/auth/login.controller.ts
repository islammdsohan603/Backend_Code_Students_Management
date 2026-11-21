import type { Request, Response } from "express";
import { studentsLogin_Services } from "./login.service.js";

const isProduction = process.env.NODE_ENV === "production";

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 3 * 24 * 60 * 60 * 1000,
  path: "/api/login/refresh",
};

// Login Controller
const logInStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentsLogin_Services.studentLogin_Service(req.body);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Set Refresh Token in HttpOnly Cookie
    res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

    // Return Access Token Only
    return res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        accessToken: result.accessToken,
        student: result.student,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Refresh Token Controller
const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    // Get Refresh Token From Cookie
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Not Found!",
      });
    }

    // Generate New Access Token
    const result =
      await studentsLogin_Services.refreshAccessToken_Service(refreshToken);

    if (!result) {
      res.clearCookie("refreshToken", refreshCookieOptions);

      return res.status(401).json({
        success: false,
        message: "Invalid or Expired Refresh Token! Please Login Again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Access Token Refreshed Successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout Controller
const logOutStudent = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", refreshCookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logout Successfully!",
  });
};

export const studentLogin_Controller = {
  logInStudent,
  refreshAccessToken,
  logOutStudent,
};
