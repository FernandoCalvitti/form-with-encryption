import { createSlice } from "@reduxjs/toolkit";
import { initialData } from "../../../constants/constants";

const initialState = {
  formData: initialData,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setNewFormData: (state, action: any) => {
      state.formData = action.payload;
    },
    encryptFormData: (state, action) => {},
  },
});

export const { setNewFormData, encryptFormData } = formSlice.actions;

export default formSlice.reducer;
