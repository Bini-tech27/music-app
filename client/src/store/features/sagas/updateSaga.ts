import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  updateSong,
  updateSongFailure,
  updateSongSuccess,
} from "../slices/updateSlice";
import { API_BASE_URL } from "../../../config/endPoint";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

function* workUpdateSong(action: PayloadAction<Song>) {
  try {
    const { id, title, artist, album, genre } = action.payload;

    const response: AxiosResponse<Song> = yield call(() =>
      axios.put(`${API_BASE_URL}update/${id}`, {
        title,
        artist,
        album,
        genre,
      })
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    console.error("Error updating song:", error);
    yield put(updateSongFailure());
  }
}

export function* updateSaga() {
  yield takeLatest(updateSong.type, workUpdateSong);
}
