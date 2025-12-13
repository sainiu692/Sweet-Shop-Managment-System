require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");

beforeAll(async () => {
  await connectDB(); // 🔥 REQUIRED
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login", () => {
  it(
    "logs in a user and sets auth cookie",
    async () => {
      const email = `login_${Date.now()}@example.com`;

      // register first
      await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "Login",
          lastName: "User",
          emailId: email,
          password: "password123",
          gender: "male",
        });

      // login
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          emailId: email,
          password: "password123",
        });

      expect(response.statusCode).toBe(200);
      expect(response.headers["set-cookie"]).toBeDefined();
    },
    10000
  );
});

