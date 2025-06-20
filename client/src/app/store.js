import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/auth/userAuthSlice.js";
import adminAuthReducer from "../features/auth/adminAuthSlice.js";
import loadingReducer from "../features/loading/loadingSlice.js";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    loading: loadingReducer,
  },
});

export default store;
