import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ChatSlice from "./chat/ChatSlice";

const allReducers = combineReducers({
  chat: ChatSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return allReducers(state, action);
};

export const resetApp = () => ({ type: "RESET_APP" });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
