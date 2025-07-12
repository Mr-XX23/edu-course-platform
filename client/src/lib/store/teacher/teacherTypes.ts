import { Status } from "@/lib/types/type";

export interface ITeacher {
    teacherEmail: string;
    teacherName: string;
    teacherPhoneNumber: string;
    teacherAddress: string;
}

export interface ITeacherInitialState {
    teacher: ITeacher;
    status: Status;
}