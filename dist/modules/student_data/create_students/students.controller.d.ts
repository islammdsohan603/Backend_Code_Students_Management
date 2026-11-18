import type { Request, Response } from "express";
declare const createStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllStudents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const singleStudentsData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const students_controller: {
    createStudent: typeof createStudent;
    getAllStudents: typeof getAllStudents;
    singleStudentsData: typeof singleStudentsData;
};
export {};
//# sourceMappingURL=students.controller.d.ts.map