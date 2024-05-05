const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;

  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  if (!userId) {
    throw new Error("User must be authenticated.");
  }

  req.userId = userId;

  next();
};

module.exports = verifyUser;
