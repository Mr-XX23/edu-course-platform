import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitalState, ILoginFormData } from "./authTypes";
import { Status } from "@/lib/types/type";
import api from "@/lib/https";
import { IRegisterData } from "./authTypes";
import { AppDispatch } from "../store";


const initalState: IInitalState = {
    user: {
        email: "",
        password: "",
    },
    status: Status.LOADING,
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

// Function to register user
function registerUser(formData: IRegisterData) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api.post("/auth/register", formData)
            if (response.status === 201) {
                dispatch(setUser(response.data))
                dispatch(setStatus(Status.SUCCESS))
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }
}

// function to login user
function loginUser(formData: ILoginFormData) {
    return async (dispatch: AppDispatch) => {

        try {
            const response = await api.post("api/v1/auth/login", formData);
            if (response.status === 200) {
                dispatch(setUser(response.data));
                dispatch(setStatus(Status.SUCCESS));
            } else {
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error logging in user:", error);
        }
    }
}

export { registerUser, loginUser };