import { describe, it, beforeAll } from "vitest";
import app from "../index";
import request from "supertest";

describe("Register expenses", () => {
  let token;

  beforeAll(async () => {
    await request(app)
      .post("/users")
      .send({ email: "fakeuser@email.com", password: "12345678" });

    const authUserResponse = await request(app)
      .post("/users/auth")
      .send({ email: "fakeuser@email.com", password: "12345678" });
    console.log(authUserResponse.body);
    token = authUserResponse.body;
  });

  it("Should register an expense", async () => {
    const response = await request(app)
      .post("/expenses/data")
      .set("Authorization", token)
      .send({
        description: "fake description",
        cost: 2000,
        date: new Date("2023-12-17T03:24:00")
      });

    console.log(response.body);
  });
});
