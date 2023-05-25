import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ChatSlice from "./chat/ChatSlice";

const rootReducer = combineReducers({ chat: ChatSlice.reducer });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
