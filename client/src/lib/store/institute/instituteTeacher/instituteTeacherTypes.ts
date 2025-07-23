import { Status } from "@/lib/types/type";


enum teacherExpertise{
    Beginner = "beginner",
    Intermediate = "intermediate",
    Pro = "pro",
}

export interface IITeacherCourse {
    courseId: string;
    courseName: string;
    courseDuration: string;
    courseDescription: string;
    coursePrice: string;
    courseThumbnail: string;
}

export interface ITeacher {
    teacherName: string;
    teacherEmail: string;
    teacherPhoneNumber: string;
    teacherAddress: string;
    teacherExpertise: teacherExpertise | null;
    teacherSalary: string;
    joiningDate: string;
    
}

export interface IAddTeacherToInstitute extends ITeacher {
    course : IITeacherCourse;
}

export interface IInstituteTeacherState {
    teacher: IAddTeacherToInstitute;
    Status: Status;
}

