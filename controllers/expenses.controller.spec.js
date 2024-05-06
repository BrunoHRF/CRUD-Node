import { describe, it, beforeAll, expect } from "vitest";
import app from "../index";
import request from "supertest";

describe("Validate register routes", () => {
  let token;
  let userId;
  beforeAll(async () => {
    const response = await request(app)
      .post("/users")
      .send({ email: "fakeuser@email.com", password: "12345678" });

    const authUserResponse = await request(app)
      .post("/users/auth")
      .send({ email: "fakeuser@email.com", password: "12345678" });

    token = authUserResponse.body;
    userId = response._body._id;
  });

  it("Should register an expense", async () => {
    const response = await request(app)
      .post("/expenses/data")
      .set("Authorization", token)
      .send({
        description: "fake description",
        cost: 2000,
        date: new Date("2022-05-05T12:30:45.000Z")
      });
    expect(response.statusCode).toBe(200);
  });

  it("Should not register an expense due to value 0", async () => {
    const response = await request(app)
      .post("/expenses/data")
      .set("Authorization", token)
      .send({
        description: "fake description",
        cost: 0,
        date: new Date("2022-05-05T12:30:45.000Z")
      });
    expect(response.statusCode).toBe(400);
  });

  it("Should not register an expense by date being at the future", async () => {
    const response = await request(app)
      .post("/expenses/data")
      .set("Authorization", token)
      .send({
        description: "fake description",
        cost: 0,
        date: new Date("2026-05-05T12:30:45.000Z")
      });
    expect(response.statusCode).toBe(500);
  });

  it("Should not register an expense by empty description", async () => {
    const response = await request(app)
      .post("/expenses/data")
      .set("Authorization", token)
      .send({
        description: "",
        cost: 0,
        date: new Date("2022-05-05T12:30:45.000Z")
      });
    expect(response.statusCode == 500);
  });

  it("Should call expenses specific for the user", async () => {
    const response = await request(app)
      .get(`/expenses/data/user`)
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });

  it("Should invalidate the call due to invalid credentials", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", token)
      .send({
        email: "fakeuser@email.com",
        password: "1234567"
      });
    expect(response.statusCode).toBe(404);
  });
});
