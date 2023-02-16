import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    birtDate: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    companyName: "",
    companyCreationDate: "",
    companyAddress: "",
    companyCity: "",
    companyState: "",
    companyZip: "",
    companyPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    files: {
      file: null,
      fileName: "",
      fileType: "",
      fileSize: 0,
    },
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    encryptFormData: (state, action) => {},
  },
});

export const { setFormData, encryptFormData } = formSlice.actions;

export default formSlice.reducer;
