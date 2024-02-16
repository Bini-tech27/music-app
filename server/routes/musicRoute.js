const express = require("express");
const router = express.Router();
const {
  createMusic,
  listMusic,
  updateMusic,
  deleteMusic,
  getMusicStatistics,
} = require("../controllers/musicController");

// create route
router.post("/insert", createMusic);

// List route
router.get("/list", listMusic);

// update route
router.put("/update/:id", updateMusic);

//  delete route
router.delete("/remove/:id", deleteMusic);
// statics route
router.get("/statistics", getMusicStatistics);

module.exports = router;
