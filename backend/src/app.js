const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRouter");
const sweetRouter = require("./routes/sweetRouter");
const inventoryRouter = require("./routes/inventoryRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/sweets", sweetRouter);
app.use("/api/inventory", inventoryRouter);


app.get("/", (req, res) => {
  res.send("Sweet Shop Backend Running");
});

module.exports = app;
