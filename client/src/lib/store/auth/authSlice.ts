import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitalState, ILoginFormData } from "./authTypes";
import { Status } from "@/lib/types/type";


const initalState: IInitalState = {
    user: {
        email: "",
        password: "",
    },
    status: Status.IDLE,
}

const authSlice = createSlice({
    name : "auth",
    initialState: initalState,
    reducers: {
        setUser : ( state: IInitalState, action: PayloadAction<ILoginFormData> ) => {
            state.user = action.payload;
        },
        setStatus : ( state: IInitalState, action: PayloadAction<Status> ) => {
            state.status = action.payload;
        }
    } 
})

const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;
export { setUser, setStatus };