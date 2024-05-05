const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  description: {
    type: String,
    require: [true, "Exprenses properly descripted"]
  },
  date: {
    type: Date,
    require: [true, "Date when expenses occured"]
  },
  userId: {
    type: String,
    require: [true, "User responsible for the expense"]
  },
  cost: {
    type: Number,
    require: true
  }
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
