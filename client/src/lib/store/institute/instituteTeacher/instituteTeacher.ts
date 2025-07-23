import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherState } from "./instituteTeacherTypes";
import { Status } from "@/lib/types/type";
import { IAddTeacherToInstitute } from "./instituteTeacherTypes";
import { AppDispatch } from "../../store";
import api from "@/lib/https";

const initialState: IInstituteTeacherState = {
    teacher: {
        teacherName: "",
        teacherEmail: "",
        teacherPhoneNumber: "",
        teacherAddress: "",
        teacherExpertise: null,
        teacherSalary: "",
        joiningDate: "",
        course: {
            courseId: "",
            courseName: "",
            courseDuration: "",
            courseDescription: "",
            coursePrice: "",
            courseThumbnail: "",
        },
    },
    Status: Status.IDLE,
}

const instituteTeacherSlice = createSlice({
    name: "instituteTeacher",
    initialState: initialState,
    reducers: {
        setTeacher: ( state : IInstituteTeacherState , action : PayloadAction<IAddTeacherToInstitute> ) => {
            state.teacher = action.payload;
        },
        setStatus: ( state : IInstituteTeacherState , action : PayloadAction<Status> ) => {
            state.Status = action.payload;
        },
    }
})

const { setTeacher, setStatus } = instituteTeacherSlice.actions;
export { setTeacher, setStatus };
export default instituteTeacherSlice.reducer;

// Thunk to add a teacher to the institute
export function addTeacherToInstitute( data: IAddTeacherToInstitute ) {
    return async function addTeacherToInstituteThunk(dispatch: AppDispatch) {
        try {
            const res = await api.post("/institute/teacher", data)
            if ( res.status === 201 ) {
                
                dispatch(setStatus(Status.SUCCESS));
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
        }
    }
}

// Thunk to fetch teacher details for the institute
export function fetchTeacherToInstitute( ) {
    return async function fetchTeacherToInstituteThunk(dispatch: AppDispatch) {
        try {
            const res = await api.get("/institute/teacher")
            if ( res.status === 200 ) {
                dispatch(setStatus(Status.SUCCESS));
                if (res.data.data.length > 0) {
                    dispatch(setTeacher(res.data.data));
                }
            }
        } catch (error) {
            console.error("Error fetching teacher:", error);
        }
    }
}

export function deleteTeacherFromInstitute( teacherId: string ) {
    return async function deleteTeacherFromInstituteThunk(dispatch: AppDispatch) {
        try {
            const res = await api.delete(`/institute/teacher/${teacherId}`)
            if ( res.status === 200 ) {
                dispatch(setStatus(Status.SUCCESS));
                // popout the deleted teacher from the state
            }
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    }
}