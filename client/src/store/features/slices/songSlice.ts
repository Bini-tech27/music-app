import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongState {
  songs: Song[];
  isLoading: boolean;
  error: null | string;
}

const initialState: SongState = {
  songs: [],
  isLoading: false,
  error: null,
};

const songSlice: any = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },
    updateSong: (state) => {
      state.isLoading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      const updatedSong = action.payload;
      const index = state.songs.findIndex(
        (song) => song._id === updatedSong._id
      );
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
      state.isLoading = false;
    },
    updateSongFailure: (state) => {
      state.isLoading = false;
    },
    postSongs: (state) => {
      state.isLoading = true;
    },
    postSongsSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.isLoading = false;
    },
    postSongsFailure: (state) => {
      state.isLoading = false;
    },
    deleteSong: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      const del = state.songs;
      const filtered = del.filter((song) => song?._id !== action.payload);
      state.songs = filtered;
      state.isLoading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = songSlice.actions;
export default songSlice.reducer;
