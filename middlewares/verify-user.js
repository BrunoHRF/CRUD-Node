const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    if (!userId) {
      throw new Error("User must be authenticated.");
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to authenticate" });
  }
};

module.exports = verifyUser;
