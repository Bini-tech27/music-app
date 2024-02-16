import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./songSlice";
import addSlice from "./addSlice";
import deleteSlice from "./deleteSlice";
import staticsSlice from "./staticsSlice";
import updateSlice from "./updateSlice";
export const rootReducer = combineReducers({
  songSlice: songSlice,
  addSlice: addSlice,
  deleteSlice: deleteSlice,
  staticsSlice: staticsSlice,
  updateSlice: updateSlice
});
export type RootState = ReturnType<typeof rootReducer>;
