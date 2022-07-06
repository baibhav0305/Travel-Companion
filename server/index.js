const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const bucketListRoutes = require("./routes/bucketList");
const connectDB = require("./config/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bucketList", bucketListRoutes);
app.use("/api/user", userRoutes);

// Serve Frontend
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
