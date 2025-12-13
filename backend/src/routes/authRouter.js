const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const { emailId } = req.body;
  res.status(201).json({
    emailId,
  });
});

module.exports = authRouter;
