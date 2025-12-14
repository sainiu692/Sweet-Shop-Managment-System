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

describe("POST /api/auth/login", () => {
  it("logs in a user and returns auth cookie and user data", async () => {
    const email = `login_${Date.now()}@example.com`;
    const password = "Password@123";

    // 1️⃣ Register user first
    await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Login",
        lastName: "User",
        emailId: email,
        password,
        gender: "male",
      })
      .expect(201);

    // 2️⃣ Login user
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        emailId: email,
        password,
      });

    // 3️⃣ Assertions
    expect(response.statusCode).toBe(200);

    // cookie should be set
    expect(response.headers["set-cookie"]).toBeDefined();

    // response body structure
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.emailId).toBe(email);
    expect(response.body.user).toHaveProperty("token");
  }, 10000);
});
