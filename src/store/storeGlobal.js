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

    //UserManagent
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRoleData: (state, action) => {
      state.roleData = action.payload;
    },

    // invoice
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setInvoiceDetail: (state, action) => {
      state.invoiceDetail = action.payload;
    },
    setInvoiceEdit: (state, action) => {
      state.invoiceEdit = action.payload;
    },
    setCurrency: (state, action) => {
      state.currencyData = action.payload;
    }
  },
});

export const {
  setAppState,
  setUserData,
  setRoleData,
  setInvoiceData,
  setInvoiceEdit,
  setInvoiceDetail,
  setCurrency
} = globalSlice.actions;
export default globalSlice.reducer;