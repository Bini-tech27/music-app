import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongState {
  updatedSong: Song | null;
  isLoading: boolean;
  error: null | string;
}

const initialState: SongState = {
  updatedSong: null,
  isLoading: false,
  error: null,
};

const updateSlice:any = createSlice({
  name: "songs",
  initialState,
  reducers: {
    updateSong: (state) => {
      state.isLoading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.updatedSong = action.payload;
      state.isLoading = false;
    },
    updateSongFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { updateSong, updateSongSuccess, updateSongFailure } =
  updateSlice.actions;
export default updateSlice.reducer;
