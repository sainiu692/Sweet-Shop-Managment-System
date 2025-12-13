const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateRegisterData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

  try {
    validateRegisterData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    res.status(201).json({
      "message": "User registered successfully",
      id: user._id,
      emailId: user.emailId,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = authRouter;
