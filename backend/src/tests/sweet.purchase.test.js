require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");
const User = require("../models/user");
const Sweet = require("../models/sweet");
const bcrypt = require("bcrypt");

let cookie;
let sweetId;
let userEmail;

beforeAll(async () => {
  await connectDB();

  // create user
  userEmail = `buyer_${Date.now()}@example.com`;
  const password = "User@123";
  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    firstName: "Buyer",
    lastName: "User",
    emailId: userEmail,
    password: passwordHash,
    gender: "male",
  });

  // login user
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      emailId: userEmail,
      password,
    });

  cookie = loginRes.headers["set-cookie"];

  // create sweet
  const sweet = await Sweet.create({
    name: "Ladoo",
    category: "Indian",
    price: 10,
    quantity: 2,
  });

  sweetId = sweet._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/inventory/:id/purchase", () => {
  it("allows user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/inventory/${sweetId}/purchase`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(1);
  });
});
