require("dotenv").config();

const request = require("supertest");
const app = require("../app");

describe("POST /api/auth/logout", () => {
  it("logs out user by clearing auth cookie", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});
