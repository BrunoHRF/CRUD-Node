const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpensesByUser,
  registerExpense,
  updateExpenseById,
  removeExpense
} = require("../controllers/expenses.controller");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const verifyUser = require("../middlewares/verify-user");

const expenseBodySchema = z.object({
  description: z.string().max(191),
  date: z.coerce.string().refine(value => {
    const expenseDate = new Date(value);

    if (expenseDate > new Date()) {
      throw new Error("Expense must be in the past.");
    }

    return expenseDate;
  }),
  cost: z.number().positive()
});

router.use(verifyUser);
router.get("/", getExpenses);
router.get("/user", getExpensesByUser);
router.post(
  "/",
  validateRequest({
    body: expenseBodySchema
  }),
  registerExpense
);

router.put(
  "/:id",
  validateRequest({
    body: expenseBodySchema
  }),
  updateExpenseById
);

router.delete("/:id", removeExpense);

module.exports = router;
