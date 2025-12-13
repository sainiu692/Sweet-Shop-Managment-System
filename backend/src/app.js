const express = require("express");
const app = express();


const authRouter = require("./routes/authRouter");

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Sweet Shop Backend Running");
});

module.exports = app;
