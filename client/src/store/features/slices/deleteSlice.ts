import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface DeleteState {
  songs: Song[];
  isLoading: boolean;
  error: null | string;
}

const initialState: DeleteState = {
  songs: [],
  isLoading: false,
  error: null,
};

const deleteSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    deleteSong: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      console.log("objects", action.payload)
      state.songs.filter((song) => song?._id !== action.payload);
      state.isLoading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteSong, deleteSongSuccess, deleteSongFailure } =
  deleteSlice.actions;
export default deleteSlice.reducer;
