import "dotenv/config";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { beforeAll, afterAll } from "vitest";

beforeAll(async () => {
  const databaseURL = process.env.DATABASE_URL.replace(
    "Expense-Register",
    randomUUID()
  );

  process.env.DATABASE_URL = databaseURL;
  await mongoose.disconnect();
  await mongoose.connect(databaseURL);
});

afterAll(async () => {
  const databaseURL = process.env.DATABASE_URL.replace(
    "Expense-Register",
    randomUUID()
  );

  await mongoose.disconnect();
  await mongoose.connect(databaseURL);

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
