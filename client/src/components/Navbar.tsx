import {AppBar, Button, Toolbar, Typography } from "@mui/material";
import Logo from "../assets/music_Logo.png"
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {

  return (
    <AppBar position="fixed" sx={{ background: "#063970" }}>
      <Toolbar>
        <Link to={`/`}>
          <img src={Logo} alt="" />
        </Link>

        <Button
          sx={{
            marginLeft: "auto",
            background: "#5c84e7",
            "&:hover": {
              background: "#CB318F",
            },
          }}
          variant="contained"
        >
          <Typography
            component={Link}
            to="/addSong"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            Add song
          </Typography>
        </Button>
        <Button
          sx={{
            marginLeft: "10px",
            background: "#5c84e7",
            "&:hover": {
              background: "#CB318F",
            },
          }}
          variant="contained"
        >
          <Typography
            component={Link}
            to="/statics"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            Statics
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
