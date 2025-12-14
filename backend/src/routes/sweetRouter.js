const express = require("express");
const Sweet = require("../models/sweet");
const { userAuth } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const sweetRouter = express.Router();

sweetRouter.post("/", userAuth, adminMiddleware, async (req, res) => {
  try {
    const { name, category, price, quantity, imageUrl } = req.body;
    const existingSweet = await Sweet.findOne({ name, category });

    if (existingSweet) {
      existingSweet.quantity += quantity;
      await existingSweet.save();

      return res.status(200).json({
        message: "Sweet quantity updated",
        sweet: existingSweet,
      });
    }
    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      imageUrl,
    });

    res.status(201).json({
      message: "Sweet created successfully",
      sweet,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

sweetRouter.get("/", userAuth, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

sweetRouter.get("/search", userAuth, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = sweetRouter;
