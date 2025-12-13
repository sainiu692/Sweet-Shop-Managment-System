const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  return res.status(201).send();
});

module.exports = authRouter;
