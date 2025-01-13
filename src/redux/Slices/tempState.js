import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../../services";

const initialState = {
  globalWishList: [],
};

export const tempState = createSlice({
  name: "tempState",
  initialState,
  reducers: {
    setGlobalWishList: (state, action) => {
      state.globalWishList = action.payload;
    },
  },
});

export const { setGlobalWishList } = tempState.actions;

export default tempState.reducer;
