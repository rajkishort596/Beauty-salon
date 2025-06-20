import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthenticated: false,
  initialized: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
      state.initialized = true;
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
  },
});

export const { setCredentials, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
