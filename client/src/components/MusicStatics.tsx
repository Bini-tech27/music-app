import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/app/store";
import { fetchStatisticsRequest } from "../store/features/slices/staticsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f8f8",
    minHeight: "100vh",
    marginTop: "110px",
  },
}));

function MusicStatistics() {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const statistics = useSelector(
    (state: RootState) => state.staticsSlice.songs
  );

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <h1>Music Statistics</h1>
      {statistics ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Songs</TableCell>
                  <TableCell>{statistics.totalSongs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Artists</TableCell>
                  <TableCell>{statistics.totalArtists}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Albums</TableCell>
                  <TableCell>{statistics.totalAlbums}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Genres</TableCell>
                  <TableCell>{statistics.totalGenres}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Genre Category</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Genre Name</TableCell>
                  <TableCell>No of songs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.genreCounts?.map((genre) => (
                  <TableRow key={genre._id}>
                    <TableCell>{genre._id}</TableCell>
                    <TableCell>{genre.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Album Category</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Album Name</TableCell>
                  <TableCell>No of songs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.albumCounts?.map((album) => (
                  <TableRow key={album._id}>
                    <TableCell>{album._id}</TableCell>
                    <TableCell>{album.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Artist Category</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Artist Name</TableCell>
                  <TableCell>No of Songs</TableCell>
                  <TableCell>No of Albums</TableCell>{" "}
                  {/* New column for albums */}
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.artistCounts?.map((artist) => (
                  <TableRow key={artist._id}>
                    <TableCell>{artist._id}</TableCell>
                    <TableCell>{artist.count}</TableCell>
                    <TableCell>{artist.albums.length}</TableCell>{" "}
                    {/* Display count of albums */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MusicStatistics;
