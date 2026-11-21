export type role = "admin" | "teacher" | "student";

export const StudentRole = {
  admin: "admin",
  teacher: "teacher",
  student: "student",
} as const;

export interface IStudents {
  name: string;
  email: string;
  password: string;
  age: number;
  department: string;
  marks: number;
  role?: role;
}

export interface IUpdateStudent {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  department?: string;
  marks?: number;

  // Optional Personal Information
  bio?: string;
  address?: string;
  father_name?: string;
  mother_name?: string;
  parents_mobile_number?: string;
}
