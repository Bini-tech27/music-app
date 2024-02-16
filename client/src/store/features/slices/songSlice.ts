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

const songSlice = createSlice({
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
  },
});

export const { getSongsFetch, getSongsSuccess, getSongsFailure } =
  songSlice.actions;
export default songSlice.reducer;
