import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./Slices/userSlice";
import itemReducer from "./Slices/itemSlice";
import tempState from "./Slices/tempState";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: ["item", "tempState"],
};

const reducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  tempState: tempState,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
