require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");
const Sweet = require("../models/sweet");

let cookie;

beforeAll(async () => {
  await connectDB();

  // register normal user
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      firstName: "Viewer",
      lastName: "User",
      emailId: `viewer_${Date.now()}@example.com`,
      password: "Strong@123Password",
      gender: "male",
    });

  cookie = res.headers["set-cookie"];

  // insert sweets directly
  await Sweet.create([
    {
      name: "Barfi",
      category: "Indian",
      price: 25,
      quantity: 10,
    },
    {
      name: "Halwa",
      category: "Indian",
      price: 30,
      quantity: 5,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/sweets", () => {
  it("should return list of sweets for logged-in user", async () => {
    const response = await request(app)
      .get("/api/sweets")
      .set("Cookie", cookie);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
