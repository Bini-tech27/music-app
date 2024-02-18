import { all, call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../../config/endPoint";
import {
  postSongs,
  postSongsSuccess,
  postSongsFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  getSongsFetch,
  getSongsSuccess,
  getSongsFailure,
} from "../slices/songSlice";

interface Song {
  id:string;
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
    console.error("Error getting song:", error);
    yield put(getSongsFailure());
  }
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


export function* watchSongActions () {
    yield all([
      takeLatest(getSongsFetch.type, workGetSongsFetch),
      takeLatest(deleteSong.type, workDeleteSong),
      takeLatest(postSongs.type, workPostSongs),
      takeLatest(updateSong.type, workUpdateSong),
    ]);}

