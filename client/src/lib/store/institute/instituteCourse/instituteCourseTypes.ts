import { Status } from '@/lib/types/type';
import { IITeacherCourse } from '../instituteTeacher/instituteTeacherTypes';

export interface ICourse extends IITeacherCourse{
    courseLevel: string;
    categoryId: string;
}

export interface IInstituteCourseState {
    courses: ICourse[];
    status: Status;
}