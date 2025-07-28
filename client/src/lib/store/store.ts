import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import teacherSlice from "./teacher/teacherSlice";
import instituteSlice from "./institute/instituteSlice";


const store = configureStore({
    reducer: {
        auth : authSlice,
        teacher : teacherSlice,
        institute : instituteSlice
    }
})

// // dispatch type for useDispatch hook
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
