import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import content from "./content/slice";
export const store = configureStore({
  reducer: { content },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
