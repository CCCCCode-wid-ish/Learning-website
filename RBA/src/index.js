const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/authRoutes");
const generaluserRoutes = require("./routes/generaluserRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRequestRoutes = require("./routes/userRequestRoutes");
const app = express();

// Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // to serve uploaded documents

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/generaluser", generaluserRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRequestRoutes);

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