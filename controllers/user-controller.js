const User = require("../models/user-model");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hash(password, 6);
    const user = await User.create({ email, password: hashedPassword });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "User does not exist." });
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      return res.status(500).json({ message: "Password invalid." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  authenticateUser
};
