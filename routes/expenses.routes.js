const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  registerExpense,
  registerExpenseById,
  removeExpense
} = require("../controllers/expenses.controller");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

const createExpenseSchema = z.object({
  description: z.string().max(191),
  date: z.coerce.string().refine(value => {
    const expenseDate = new Date(value);

    if (expenseDate > new Date()) {
      throw new Error("Expense must be in the past.");
    }

    return expenseDate;
  }),
  user: z.string(),
  cost: z.number().positive()
});

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post(
  "/",
  validateRequest({
    body: createExpenseSchema
  }),
  registerExpense
);

router.post(
  "/:id",
  validateRequest({
    body: createExpenseSchema
  }),
  registerExpenseById
);

router.delete("/:id", removeExpense);

module.exports = router;
