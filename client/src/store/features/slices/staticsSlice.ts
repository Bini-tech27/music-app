import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  totalSongs: number;
  genreCounts: string;
  totalGenres: number;
  totalAlbums: number;
  totalArtists: number;
}


interface SongState {
  songs: Song[];
  loading: boolean;
  error: null | string;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const staticsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchStatisticsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchStatisticsRequest,
fetchStatisticsSuccess,
fetchStatisticsFailure} =
  staticsSlice.actions;
export default staticsSlice.reducer;
