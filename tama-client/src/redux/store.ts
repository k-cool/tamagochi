import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import chatSlice from "./chatSlice";

const middlewares = [];
if (process.env.NODE_ENV === "development") middlewares.push(logger);

const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
  middleware: middlewares,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
