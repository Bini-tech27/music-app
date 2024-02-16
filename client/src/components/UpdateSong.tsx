import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { updateSong } from "../store/features/slices/updateSlice";
import { AppDispatch, RootState } from "../store/app/store";
import { useParams, useNavigate } from "react-router-dom";
import { getSongsFetch } from "../store/features/slices/songSlice";

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f8f8",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

const UpdateSong: React.FC = () => {
      const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songSlice.songs);
  const { id } = useParams<{ id: string }>();

  const classes = useStyles();
  const { register,setValue, handleSubmit } = useForm<SongFormData>();

  interface SongFormData {
    title: string;
    artist: string;
    album: string;
    genre: string;
  }
  useEffect(() => {
    dispatch(getSongsFetch());
    const songToUpdate = songs.find((song) => song._id === id);
    if (songToUpdate) {
      setValue("title", songToUpdate.title);
      setValue("artist", songToUpdate.artist);
      setValue("album", songToUpdate.album);
      setValue("genre", songToUpdate.genre);
    }
  }, [dispatch]);

  const onSubmit: SubmitHandler<SongFormData> = (data: SongFormData) => {
    dispatch(updateSong({ id: id, ...data }));
                                  navigate("/");


  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <TextField
              label="Title"
              type="text"
              {...register("title")}
              sx={{ width: "600px", marginTop: "20px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Artist"
              type="text"
              {...register("artist")}
              sx={{ width: "600px", marginTop: "20px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Album"
              type="text"
              {...register("album")}
              sx={{ width: "600px", marginTop: "20px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Genre"
              type="text"
              {...register("genre")}
              sx={{ width: "600px", marginTop: "20px", marginBottom: "20px" }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Update Song
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default UpdateSong;
