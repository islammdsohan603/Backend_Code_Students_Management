import type { IStudents } from "./students.interface.js";
declare const createStudentData: (palyoad: IStudents) => Promise<any>;
declare const getStudents: (palyoad: IStudents) => Promise<any[]>;
export declare const studentsService: {
    createStudentData: typeof createStudentData;
    getStudents: typeof getStudents;
};
export {};
//# sourceMappingURL=students.service.d.ts.map