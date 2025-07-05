import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeacherState {
  teachers: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
};

const teachersSlice = createSlice({
  name: "teacherSlice",
  initialState: initialState,
  reducers: {
    setTeachers: (state: TeacherState, action: PayloadAction<string[]>) => {
      state.teachers = action.payload;
    },
    setLoading: (state: TeacherState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: TeacherState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

const { setTeachers, setLoading, setError } = teachersSlice.actions;
export { setTeachers, setLoading, setError };
export default teachersSlice.reducer;
