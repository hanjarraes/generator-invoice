import { createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
  name: "login",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;
