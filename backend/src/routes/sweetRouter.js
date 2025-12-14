const express = require("express");
const Sweet = require("../models/sweet");
const { userAuth } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const sweetRouter = express.Router();

sweetRouter.post("/", userAuth, adminMiddleware, async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = sweetRouter;
