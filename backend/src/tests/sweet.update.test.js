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

beforeAll(async () => {
  await connectDB();

  const passwordHash = await bcrypt.hash("Admin@123", 10);
  const admin = await User.create({
    firstName: "Admin",
    lastName: "User",
    emailId: `admin_${Date.now()}@example.com`,
    password: passwordHash,
    gender: "male",
    isAdmin: true,
  });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      emailId: admin.emailId,
      password: "Admin@123",
    });

  cookie = loginRes.headers["set-cookie"];

  const sweet = await Sweet.create({
    name: "Rasgulla",
    category: "Indian",
    price: 20,
    quantity: 10,
  });

  sweetId = sweet._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("PUT /api/sweets/:id", () => {
  it("should update sweet details for admin", async () => {
    const response = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Cookie", cookie)
      .send({
        price: 30,
        quantity: 25,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.price).toBe(30);
    expect(response.body.quantity).toBe(25);
  });
});
