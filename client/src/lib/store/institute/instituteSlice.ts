import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteInitialState, IInstitute } from "./instituteTypes";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../store";
import api from "@/lib/https";

const initalState: IInstituteInitialState = {
  institute: {
    instituteEmail: "",
    instituteName: "",
    instituteAddress: "",
    institutePhoneNumber: "",
  },
  status: Status.LOADING,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState: initalState,
  reducers: {
    setInstitute: (
      state: IInstituteInitialState,
      action: PayloadAction<IInstitute>
    ) => {
      state.institute = action.payload;
    },
    setStatus: (
      state: IInstituteInitialState,
      action: PayloadAction<Status>
    ) => {
      state.status = action.payload;
    },
  },
});

const { setInstitute, setStatus } = instituteSlice.actions;
export default instituteSlice.reducer;
export { setInstitute, setStatus };

export function createInstitute(data: IInstitute) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("institute/create-institute", data);
      dispatch(setInstitute(response.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Failed to create institute:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
