import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../../services";

const initialState = {
  themeColor: colors.theme,
  wizard: [],
  isSurvey: false,
  userData: "",
  accessToken: "",
  refreshToken: "",
  fcm: "",
  previousUser: "",
  perviousUserData: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeColor = action.payload;
    },
    wizardUpdate: (state, action) => {
      state.wizard = action.payload;
    },
    isSurveyComplete: (state, action) => {
      state.isSurvey = action.payload;
    },
    userData: (state, action) => {
      state.userData = action.payload;
    },
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    fcmToken: (state, action) => {
      state.fcm = action.payload;
    },
    previousUser: (state, action) => {
      state.previousUser = action.payload;
    },
    previousUserData: (state, action) => {
      state.perviousUserData = action.payload;
    },
    resetState: (state, action) => {
      state.accessToken = "";
      state.userData = "";
      state.refreshToken = "";
      state.fcm = "";
      state.previousUser = "";
      state.perviousUserData = "";
    },
  },
});

export const {
  changeTheme,
  wizardUpdate,
  isSurveyComplete,
  userData,
  accessToken,
  refreshToken,
  fcmToken,
  previousUser,
  previousUserData,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
