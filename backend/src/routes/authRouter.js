const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateRegisterData } = require("../utils/validation");
const validator = require("validator");

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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email address");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials!!!!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "none", 
        expires: new Date(Date.now() + 8 * 360000),
      });
      res.send(user);
    } else {
      throw new Error("invalid credentials!!!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = authRouter;
