require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../config/database");
const User = require("../models/user");

let adminCookie;

beforeAll(async () => {
  await connectDB();

  // create admin user
  const adminEmail = `admin_${Date.now()}@example.com`;

  const res = await request(app)
    .post("/api/auth/register")
    .send({
      firstName: "Admin",
      lastName: "User",
      emailId: adminEmail,
      password: "Strong@123Password",
      gender: "male",
    });

  // make user admin
  await User.findOneAndUpdate(
    { emailId: adminEmail },
    { isAdmin: true }
  );

  adminCookie = res.headers["set-cookie"];
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/sweets", () => {
  it("should allow admin to create a sweet", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Cookie", adminCookie)
      .send({
        name: "Gulab Jamun"+Date.now(),
        category: "Indian",
        price: 20,
        quantity: 10,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Gulab Jamun");
  });
});
