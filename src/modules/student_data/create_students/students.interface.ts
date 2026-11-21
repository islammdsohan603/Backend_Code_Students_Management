export type StudentRole = "admin" | "student";

export interface IStudents {
  name: string;
  email: string;
  password: string;
  age: number;
  department: string;
  marks: number;
  role?: StudentRole;
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
