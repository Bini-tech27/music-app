import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/app/store";
import { getSongsFetch } from "../store/features/slices/songSlice";
import { deleteSong } from "../store/features/slices/deleteSlice";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grid,
  Modal,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f8f8",
    minHeight: "100vh",
    marginTop: "110px",
  },
  card: {
    width: "90%",
    maxWidth: 1080,
    margin: "auto",
  },
  cardContent: {
    padding: "auto",
  },
  button: {
    marginLeft: "auto",
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 90,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DisplaySong: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songSlice.songs);
  const isLoading = useSelector(
    (state: RootState) => state.songSlice.isLoading
  );
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const handleDeleteModal = (song: string) => {
    setOpenModal(true);
    setSelectedSong(song);
  };

  const handleDeleteModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedSong) {
      dispatch(deleteSong(selectedSong));
      navigate("/");
    }
    setOpenModal(false);
  };

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {songs.map((song:any) => (
            <Grid item xs={12} key={song._id}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" gutterBottom>
                    {song.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {song.artist} - {song.album}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Genre: {song.genre}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/update/${song._id}`}>
                    <IconButton className={classes.button} aria-label="update">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    className={classes.button}
                    aria-label="delete"
                    onClick={() => handleDeleteModal(song._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={openModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this song?
          </Typography>
          <Button onClick={handleDelete}>Yes </Button>
          <Button onClick={handleDeleteModalClose}>No </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DisplaySong;
