import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "failed";
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCredentials, logout, setAuthStatus } = userAuthSlice.actions;
export default userAuthSlice.reducer;
