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

const addSlice:any = createSlice({
  name: "songs",
  initialState,
  reducers: {
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
  },
});

export const { postSongs, postSongsSuccess, postSongsFailure } = addSlice.actions;
export default addSlice.reducer;
