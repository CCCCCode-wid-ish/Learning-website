const express = require("express");
const dotenv = require("dotenv").config(); 
const dbConnect = require("./config/dbConnect.js")
const authRoutes = require("./routes/authRoutes")



dbConnect();




const app = express();

//Middleware
app.use(express.json());

//Routes

app.use("/api/auth", authRoutes);

//Start the port
const PORT = process.env.PORT || 3001; //to define the .env variable
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});



//Database connection
//MongoDB atlas
