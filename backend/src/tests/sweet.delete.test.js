require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Sweet = require("../models/sweet");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { connectDB } = require("../config/database");

let cookie;
let sweetId;
let adminEmail;

beforeAll(async () => {
  await connectDB();

  adminEmail = `admin_${Date.now()}@example.com`;
  const password = "Admin@123";
  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    firstName: "Admin",
    lastName: "User",
    emailId: adminEmail,
    password: passwordHash,
    gender: "male",
    isAdmin: true,
  });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ emailId: adminEmail, password });

  cookie = loginRes.headers["set-cookie"];

  const sweet = await Sweet.create({
    name: "Jalebi",
    category: "Indian",
    price: 15,
    quantity: 10,
  });

  sweetId = sweet._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("DELETE /api/sweets/:id", () => {
  it("deletes a sweet for admin", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });
});
