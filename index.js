const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/expense.model");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/expenses/data", async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/expenses/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) res.status(404).json({ message: "Data not found" });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/expenses/data", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/expenses/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndUpdate(id, req.body);

    if (!expense) res.status(404).json({ message: "Data not found" });

    const updatedExpense = await Expense.findById(id);

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/expenses/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) res.status(404).json({ message: "Data not found" });

    res.status(200).json({ message: "Data deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://brunohrf:hijqM9SVmgCZIX9X@backenddb.2ij7wrc.mongodb.net/Expense-Register?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Error"));
