import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteInitialState, IInstitute } from "./instituteTypes";
import { Status } from "@/lib/types/type";

const initalState: IInstituteInitialState = {
    institute: {
        instituteEmail: "",
        instituteName: "",
        instituteAddress: "",
        institutePhoneNumber: "",
    },
    status: Status.LOADING,
}

const instituteSlice = createSlice({

    name : "institute",
    initialState: initalState,
    reducers: {
        setInstitute : ( state: IInstituteInitialState, action : PayloadAction<IInstitute>) => {
            state.institute = action.payload;
        },
        setStatus : ( state: IInstituteInitialState, action: PayloadAction<Status> ) => {
            state.status = action.payload;
        }
    }
    
});


const { setInstitute, setStatus } = instituteSlice.actions;
export default instituteSlice.reducer;
export { setInstitute, setStatus };