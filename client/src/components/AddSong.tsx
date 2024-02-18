import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid } from "@mui/material";
import { postSongs } from "../store/features/slices/songSlice";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

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
interface Data {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const AddSong: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = (data:Data) => {
    dispatch(postSongs(data));
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
              Add Song
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default AddSong;
