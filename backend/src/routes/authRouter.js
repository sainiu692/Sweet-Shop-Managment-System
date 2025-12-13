const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateRegisterData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    
    validateRegisterData(req);

    const { firstName, lastName, emailId, password,gender } = req.body;

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
      gender
    });

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
      emailId: user.emailId,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = authRouter;
