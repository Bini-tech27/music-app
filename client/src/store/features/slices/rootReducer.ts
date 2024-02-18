import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./songSlice";
import staticsSlice from "./staticsSlice";
export const rootReducer = combineReducers({
  songSlice: songSlice,
  staticsSlice: staticsSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
