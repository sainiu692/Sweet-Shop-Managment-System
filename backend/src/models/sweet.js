const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      default:
        "https://via.placeholder.com/300?text=Sweet", 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sweet", sweetSchema);
