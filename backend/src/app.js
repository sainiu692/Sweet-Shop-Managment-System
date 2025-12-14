const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors =require('cors')

const authRouter = require("./routes/authRouter");
const sweetRouter = require("./routes/sweetRouter");
const inventoryRouter = require("./routes/inventoryRouter");

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://sweet-shop-managment-system-1.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.use("/api/auth", authRouter);
app.use("/api/sweets", sweetRouter);
app.use("/api/inventory/sweets", inventoryRouter);


app.get("/", (req, res) => {
  res.send("Sweet Shop Backend Running");
});

module.exports = app;
