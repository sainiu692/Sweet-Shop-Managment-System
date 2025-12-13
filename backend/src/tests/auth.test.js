const request = require("supertest");
const app = require("../app");

describe("POST /api/auth/register", () => {
  it("creates a new user and returns 201 status", async () => {
    const userPayload = {
      firstName: "Test",
      lastName: "User",
      emailId: "testuser@example.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(userPayload);

    expect(response.statusCode).toBe(201);
  });
});
