import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    user: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: IUserState = {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    }

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        setUser : (state:IUserState, action:PayloadAction<string | null>) => {
            state.user = action.payload;
        },
        setLoading: (state:IUserState, action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state:IUserState, action:PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }

})

const { setUser, setLoading, setError } = userSlice.actions;
export { setUser, setLoading, setError };
export default userSlice.reducer;
