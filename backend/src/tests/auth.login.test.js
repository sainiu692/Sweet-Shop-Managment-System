require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await connectDB();

  const passwordHash = await bcrypt.hash("password123", 10);
  await User.create({
    firstName: "Login",
    lastName: "User",
    emailId: "loginuser@example.com",
    password: passwordHash,
    gender: "male",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login", () => {
  it("returns 200 for valid credentials (RED)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        emailId: "loginuser@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
  });

  it("sets auth token cookie on successful login (RED)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        emailId: "loginuser@example.com",
        password: "password123",
      });

    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
