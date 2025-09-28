import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discounts: null,
};

const serviceDiscountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setDiscount: (state, action) => {
      state.discounts = action.payload.discounts;
    },
  },
});

export const { setDiscount } = serviceDiscountSlice.actions;
export default serviceDiscountSlice.reducer;
