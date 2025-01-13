import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../../services";

const initialState = {
  hasBought: false,
  goingToBought: false,
  id: "",
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setHasBought: (state, action) => {
      state.hasBought = action.payload;
    },
    setGoingToBought: (state, action) => {
      state.goingToBought = action.payload;
    },
    setItemId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setGoingToBought, setHasBought, setItemId } = itemSlice.actions;

export default itemSlice.reducer;
