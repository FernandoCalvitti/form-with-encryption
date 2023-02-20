import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../../../constants/constants";
import encryptObjectWithFiles from "../../../helpers/encryptObjectWithFiles";
import { FormDataI, FormState } from "../../../Types/FormData";

const initialState: FormState = initialData;

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    encryptFormData: (
      state,
      action: PayloadAction<{
        form: FormDataI;
        key: string;
        files: string[] | string;
      }>
    ) => {
      const { form, key, files } = action.payload;
      state.encryptFormData = encryptObjectWithFiles(form, key, files);
    },
  },
});

export const { updateField, encryptFormData } = formSlice.actions;

export default formSlice.reducer;
