const Expense = require("../models/expense.model");
const User = require("../models/user.model");

const resend = require("../utils/resend");

const getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpensesByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const expense = await Expense.find({ userId });

    if (!expense) res.status(404).json({ message: "Data not found" });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerExpense = async (req, res) => {
  try {
    const { description, date, cost } = req.body;

    const expense = await Expense.create({
      description,
      date,
      cost,
      userId: req.userId
    });

    const user = await User.findById(req.userId);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Despesa Cadastrada",
      html: `<p>Nova despesa cadastrada no valor de <b>${new Intl.NumberFormat(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      ).format(cost)}</b></p>`
    });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) res.status(404).json({ message: "Data not found" });

    if (expense.userId !== req.userId) {
      return res.status(409).json({ message: "User not authorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body);

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (expense.userId !== req.userId) {
      return res.status(409).json({ message: "User not authorized" });
    }

    if (!expense) res.status(404).json({ message: "Data not found" });

    await Expense.deleteOne({ id });

    res.status(200).json({ message: "Data deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExpenses,
  getExpensesByUser,
  registerExpense,
  updateExpenseById,
  removeExpense
};
