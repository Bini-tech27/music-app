import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { postSongsFailure, postSongsSuccess } from "../slices/addSlice";
import { API_BASE_URL } from "../../../config/endPoint";

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
function* workPostSongs(action: PayloadAction<Song>) {
  try {
    const { title, artist, album, genre } = action.payload;

    const response: AxiosResponse<Song> = yield call(() =>
      axios.post(`${API_BASE_URL}insert`, {
        title,
        artist,
        album,
        genre,
      })
    );

    yield put(postSongsSuccess(response.data));
  } catch (error: any) {
    console.error("Error posting song:", error);
    yield put(postSongsFailure());
  }
}

function* addSaga() {
  yield takeLatest("songs/postSongs", workPostSongs);
}

export default addSaga;
