
require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  it("creates a new user and returns 201 with user email", async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    const userPayload = {
      firstName: "Test",
      lastName: "User",
      emailId: uniqueEmail,
      password: "Test@123456",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(userPayload);

    // assertions
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("emailId");
    expect(response.body.emailId).toBe(uniqueEmail);
  });
});
