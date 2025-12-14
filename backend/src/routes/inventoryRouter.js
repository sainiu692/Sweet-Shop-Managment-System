const express = require("express");
const Sweet = require("../models/sweet");
const { userAuth } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const inventoryRouter = express.Router();


inventoryRouter.post("/:id/purchase", userAuth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Sweet is out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json({
      message: "Sweet purchased successfully",
      remainingQuantity: sweet.quantity,
      sweet,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

inventoryRouter.post(
  "/:id/restock",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be a positive number" });
      }

      const sweet = await Sweet.findById(req.params.id);
      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" });
      }

      sweet.quantity += Number(quantity);
      await sweet.save();

      res.status(200).json({
        message: "Sweet restocked successfully",
        newQuantity: sweet.quantity,
        sweet,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = inventoryRouter;
