import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentState {
    data: string;
}

const initialState: StudentState = {
        data : "",
    }

const studentSlice = createSlice({
    name: 'student',
    initialState : initialState,
    reducers : {
        setData: ( state: StudentState, action:PayloadAction<string>) => {
            state.data = action.payload;
        },
    }
})

const { setData } = studentSlice.actions;
export { setData };
export default studentSlice.reducer;