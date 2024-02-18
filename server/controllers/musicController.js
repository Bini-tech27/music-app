const Music = require("../models/music");

// Create Music
const createMusic = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    const newMusic = new Music({ title, artist, album, genre });
    const savedMusic = await newMusic.save();
    res.json(savedMusic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List Music
const listMusic = async (req, res) => {
  try {
    const musicList = await Music.find();
    if (musicList.length === 0) {
      return res.status(404).json({ message: "No music records found" });
    }

    res.json(musicList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Music
const updateMusic = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    const { id } = req.params;

    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { title, artist, album, genre },
      { new: true }
    );
    res.json(updatedMusic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Music
const deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByIdAndDelete(id);
    res.json(music);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// statics
const getMusicStatistics = async (req, res) => {
  try {
    const totalSongs = await Music.countDocuments();

    const totalArtists = await Music.aggregate([
      { $group: { _id: "$artist" } }, 
      { $group: { _id: null, count: { $sum: 1 } } }, 
    ]);

    const totalAlbums = await Music.aggregate([
      { $group: { _id: "$album" } }, 
      { $group: { _id: null, count: { $sum: 1 } } }, 
    ]);

    const totalGenres = await Music.aggregate([
      { $group: { _id: "$genre" } }, 
      { $group: { _id: null, count: { $sum: 1 } } }, 
    ]);

    const genreCounts = await Music.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const albumCounts = await Music.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    const artistCounts = await Music.aggregate([
      {
        $group: {
          _id: "$artist",
          count: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
    ]);

    const statistics = {
      totalSongs,
      totalArtists: totalArtists[0].count, 
      totalAlbums: totalAlbums[0].count,
      totalGenres: totalGenres[0].count,
      genreCounts,
      albumCounts,
      artistCounts,
    };

    res.json(statistics);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMusic,
  listMusic,
  updateMusic,
  deleteMusic,
  getMusicStatistics,
};
