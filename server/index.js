require("dotenv").config();
const express = require("express");
const connectDB = require("./config/config");
const musicRoute = require("./routes/musicRoute");
const cors = require("cors");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", musicRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
