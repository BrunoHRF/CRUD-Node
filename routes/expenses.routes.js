const express = require("express");
const router = express.Router();
const Expense = require("../models/expense.model");
const {
  getExpenses,
  getExpenseById,
  registerExpense,
  registerExpenseById,
  removeExpense
} = require("../controllers/expenses.controller");

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", registerExpense);
router.post("/:id", registerExpenseById);
router.delete("/:id", removeExpense);

module.exports = router;
