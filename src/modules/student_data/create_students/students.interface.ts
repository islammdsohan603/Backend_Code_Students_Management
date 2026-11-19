export interface IStudents {
  name: string;
  email: string;
  password: string;
  age: number;
  department: string;
  marks: number;
}

export interface IUpdateStudent {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  age?: number;
  department?: string;
  marks?: number;
}
