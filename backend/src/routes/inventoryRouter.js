const express = require("express");
const Sweet = require("../models/sweet");
const { userAuth } = require("../middlewares/userAuth");
const adminMiddleware = require("../middlewares/adminMiddleware");

const inventoryRouter = express.Router();

inventoryRouter.post("/:id/purchase", userAuth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity === 0) {
      return res.status(400).json({ message: "Sweet is out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json({
      message: "Sweet purchased successfully",
      sweet,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = inventoryRouter;
