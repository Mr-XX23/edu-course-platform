import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, IInstituteCourseState } from "./instituteCourseTypes";
import { AppDispatch } from "../../store";
import api from "@/lib/https";

const initialState : IInstituteCourseState = {
    courses: [],
    status: Status.IDLE,
}

const instituteCourseSlice = createSlice({
    name: "instituteCourse",
    initialState: initialState,
    reducers: {
        setCourses: (state: IInstituteCourseState, action: PayloadAction<ICourse[]>) => {
            state.courses = action.payload;
        },
        setStatus: (state: IInstituteCourseState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setDeleteCourse: (state: IInstituteCourseState, action: PayloadAction<string>) => {
            state.courses = state.courses.filter(course => course.courseId !== action.payload);
        },
        setEditCourse: (state: IInstituteCourseState, action: PayloadAction<ICourse>) => {
            const index = state.courses.findIndex(course => course.courseId === action.payload.courseId);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        }
    }
})

const { setCourses, setStatus, setDeleteCourse, setEditCourse } = instituteCourseSlice.actions;
export { setCourses, setStatus, setDeleteCourse, setEditCourse };
export default instituteCourseSlice.reducer;

export function CreateAddCourse( data: ICourse ) {
    return async function CreateAddCourseThunk(dispatch: AppDispatch ) {
        try {
            const response = await api.post("/institute/course", data);
            if ( response.status === 201 ) {
                dispatch(setStatus(Status.SUCCESS));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error("Error adding course:", error);
        }
    }
}

export function GetAllCourses() {
    return async function GetAllCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await api.get("/institute/course");
            if (response.status === 200) {
                if ( response.data.data.length > 0 ) {
                    dispatch(setCourses(response.data.data));
                    dispatch(setStatus(Status.SUCCESS));
                }
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error("Error fetching courses:", error);
        }
    }
}

export function DeleteCourse(courseId: string) {
    return async function DeleteCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await api.delete(`/institute/course/${courseId}`);
            if (response.status === 200) {
                dispatch(setDeleteCourse(courseId));
                dispatch(setStatus(Status.SUCCESS));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error("Error deleting course:", error);
        }
    }
}

export function editInstituteCourse(courseId: string, data: ICourse) {
    return async function editInstituteCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await api.patch(`/institute/course/${courseId}`, data);
            if (response.status === 200) {
                dispatch(GetAllCourses());
                dispatch(setEditCourse({ ...data, courseId }));
                dispatch(setStatus(Status.SUCCESS));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error("Error editing course:", error);
        }
    }
}