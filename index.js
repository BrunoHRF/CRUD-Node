require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expenseRoute = require("./routes/expenses.routes");
const usersRoute = require("./routes/user.routes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/expenses/data", expenseRoute);
app.use("/users", usersRoute);

app.listen(3000, () => {
  console.log(`App listening on port ${port}`);
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Error"));
