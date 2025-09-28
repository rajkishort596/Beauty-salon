import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/auth/userAuthSlice.js";
import adminAuthReducer from "../features/auth/adminAuthSlice.js";
import loadingReducer from "../features/loading/loadingSlice.js";
import serviceDiscountReducer from "../features/serviceDiscountSlice.js";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    loading: loadingReducer,
    discounts: serviceDiscountReducer,
  },
});

export default store;
