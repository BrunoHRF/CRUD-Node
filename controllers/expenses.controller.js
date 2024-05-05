const Expense = require("../models/expense.model");

const getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) res.status(404).json({ message: "Data not found" });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndUpdate(id, req.body);

    if (!expense) res.status(404).json({ message: "Data not found" });

    const updatedExpense = await Expense.findById(id);

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) res.status(404).json({ message: "Data not found" });

    res.status(200).json({ message: "Data deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  registerExpense,
  registerExpenseById,
  removeExpense
};