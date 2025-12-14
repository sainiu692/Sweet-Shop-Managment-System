require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");
const Sweet = require("../models/sweet");

let cookie;

beforeAll(async () => {
  await connectDB();

  // register user
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      firstName: "Search",
      lastName: "User",
      emailId: `search_${Date.now()}@example.com`,
      password: "Strong@123Password",
      gender: "male",
    });

  cookie = res.headers["set-cookie"];

  // insert sweets
  await Sweet.create([
    {
      name: "Gulab Jamun",
      category: "Indian",
      price: 20,
      quantity: 10,
    },
    {
      name: "Chocolate Cake",
      category: "Bakery",
      price: 50,
      quantity: 5,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/sweets/search", () => {
  it("should return sweets filtered by category", async () => {
    const response = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Cookie", cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].category).toBe("Indian");
  });
});
