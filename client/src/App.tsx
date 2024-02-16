import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSong from "./components/AddSong";
import DisplaySong from "./components/DisplaySong";
import Navbar from "./components/Navbar";
import MusicStatistics from "./components/MusicStatics";
import UpdateSong from "./components/UpdateSong";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DisplaySong />} />
          <Route path="/addSong" element={<AddSong />} />
          <Route path="/statics" element={<MusicStatistics />} />
          <Route path="/update/:id" element={<UpdateSong />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

