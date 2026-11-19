import { pool } from "../../../db/db.js";

const studentLogin_Service = async (palyload: {
  email: string;
  password: string;
}) => {
  // check if the students exists
  // check if the password match

  const { email, password } = palyload;
  const students = await pool.query(
    `
        SELECT * FROM student_data WHERE email=$1
        `,
    [email],
  );

  if (students.rowCount === 0) {
    throw new Error("Invalid Credentials!!");
  }

  return students.rows[0];
};

export const studentsLogin_Services = {
  studentLogin_Service,
};
