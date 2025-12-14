const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRouter");
const sweetRouter = require("./routes/sweetRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/sweets", sweetRouter);


app.get("/", (req, res) => {
  res.send("Sweet Shop Backend Running");
});

module.exports = app;
