import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherInitialState, ITeacher } from "./teacherTypes";
import { Status } from "@/lib/types/type";

const initalState : ITeacherInitialState = {
    teacher: {
        teacherEmail: "",
        teacherName: "",
        teacherPhoneNumber: "",
        teacherAddress: "",
    },
    status: Status.LOADING,
}

const teacherSlice = createSlice({
    name : "teacher",
    initialState: initalState,
    reducers: {
        setTeacher : ( state: ITeacherInitialState, action: PayloadAction<ITeacher>) => {
            state.teacher = action.payload;
        },
        setStatus : ( state: ITeacherInitialState, action: PayloadAction<Status> ) => {
            state.status = action.payload;
        }
    }
})

const { setTeacher, setStatus } = teacherSlice.actions;
export default teacherSlice.reducer;
export { setTeacher, setStatus };

