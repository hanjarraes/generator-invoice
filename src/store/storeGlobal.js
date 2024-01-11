import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    sidebarShow: "responsive",
    siteData: [],
    clientData: [],
    orderTypeDataForm: [],
    supplierData: [],
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    }
  },
});

export const {
  setAppState,
  setInvoiceData
} = globalSlice.actions;
export default globalSlice.reducer;