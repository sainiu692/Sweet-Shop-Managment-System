const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
require("dotenv").config();

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });