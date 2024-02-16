import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { getSongsSuccess } from "../slices/songSlice";
import { API_BASE_URL } from "../../../config/endPoint";

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

function* workGetSongsFetch() {
  try {
    const response: AxiosResponse<Song[]> = yield call(() =>
      axios.get(`${API_BASE_URL}list`)
    );
    yield put(getSongsSuccess(response.data));
  } catch (error: any) {
    console.error("Error fetching songs:", error);
  }
}

function* songSaga() {
  yield takeLatest("songs/getSongsFetch", workGetSongsFetch);
}

export default songSaga;
