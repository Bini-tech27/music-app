import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteSongFailure,
  deleteSongSuccess,
  deleteSong,
} from "../slices/deleteSlice";
import { API_BASE_URL } from "../../../config/endPoint";

function* workDeleteSong(action: PayloadAction<string>) {
  try {
    const id = action.payload;

    yield call(() => axios.delete(`${API_BASE_URL}remove/${id}`));

    yield put(deleteSongSuccess(id));
  } catch (error: any) {
    console.error("Error deleting song:", error);
    yield put(deleteSongFailure(error));
  }
}

function* deleteSaga() {
  yield takeLatest(deleteSong.type, workDeleteSong);
}

export default deleteSaga;
