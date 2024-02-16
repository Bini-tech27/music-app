import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "../slices/staticsSlice";
import { API_BASE_URL } from "../../../config/endPoint";

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
  genreCounts: string;
  totalSongs: number;
  totalGenres: number;
  totalAlbums: number;
  totalArtists: number;
}
function* workGetStaticsFetch() {
try {
    const response: AxiosResponse<Song[]> = yield call(() =>
      axios.get(`${API_BASE_URL}statistics`)
    );
    yield put(fetchStatisticsSuccess(response.data));
  } catch (error: any) {
    console.error("Error fetching songs:", error);
    yield put(fetchStatisticsFailure);
  }
}
function* staticsSaga() {
  yield takeLatest(fetchStatisticsRequest, workGetStaticsFetch);
}

export default staticsSaga;
