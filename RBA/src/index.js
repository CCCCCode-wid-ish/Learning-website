const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/authRoutes");
const generaluserRoutes = require("./routes/generaluserRoutes")
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
//Importing the genraluserRouter
app.use("/api/generaluser", generaluserRoutes);

// Start the server FIRST, then connect to DB
const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    dbConnect();
  })
  .on("error", (err) => {
    console.log("SERVER ERROR:", err);
  });