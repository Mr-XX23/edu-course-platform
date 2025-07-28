import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitalState,IFormData, IRegisterData } from "./authTypes";
import { Status } from "@/lib/types/type";
import { api } from "@/lib/https";
import { AppDispatch } from "../store";


const initalState: IInitalState = {
    user: {
        id : "",
        username: "",
        email: ""
    },
    status: Status.IDLE,
    session: {
        loggedIn: false,
    }
}

const authSlice = createSlice({
    name : "auth",
    initialState: initalState,
    reducers: {
        setUser : ( state: IInitalState, action: PayloadAction<IRegisterData> ) => {
            state.user = action.payload;
        },
        setStatus : ( state: IInitalState, action: PayloadAction<Status> ) => {
            state.status = action.payload;
        },
        setSession : ( state : IInitalState, action: PayloadAction<boolean> ) => {
            state.session.loggedIn = action.payload;
        }
    } 
})

const { setUser, setStatus, setSession } = authSlice.actions;
export default authSlice.reducer;
export { setUser, setStatus, setSession };

// Function to register user
function registerUser(formData: IFormData) {
    return async (dispatch: AppDispatch) => {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await api.post("/auth/register", formData,)
            //console.log("Response from register:", response.data.user);
            if (response.status === 201) {
                dispatch(setUser({
                    id: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                }))
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
function loginUser(formData: IFormData) {
    return async (dispatch: AppDispatch) => {

        try {
            const response = await api.post("/auth/login", formData);
            console.log("Response from login:", response.data.user);
            if (response.status === 200) {
                dispatch(setUser(response.data.user));
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setSession(true));
            } else {
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error logging in user:", error);
        }
    }
}

// Function to refresh token
function refreshToken() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api.post("/auth/refresh");
            if (response.status === 200) {
                // Token refreshed successfully, user remains logged in
                dispatch(setSession(true));
            } else {
                dispatch(setSession(false));
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            dispatch(setSession(false));
            dispatch(setStatus(Status.ERROR));
        }
    }
}

// Function to logout user
function logoutUser() {
    return async (dispatch: AppDispatch) => {
        try {
            await api.post("/auth/logout");
            dispatch(setUser({ id: "", username: "", email: "" }));
            dispatch(setSession(false));
            dispatch(setStatus(Status.SUCCESS));
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
}
export { registerUser, loginUser, refreshToken, logoutUser };