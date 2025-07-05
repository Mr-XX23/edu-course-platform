import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";

const store = configureStore({
    reducer: {
        userSlice,
        studentReducer,
        teacherReducer
    }
})

export default store;

// dispatch type for useDispatch hook
export type AppDispatch = typeof store.dispatch;

//