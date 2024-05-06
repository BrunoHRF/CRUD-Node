const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  createUser
} = require("../controllers/user.controller");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post("/", validateRequest(bodySchema), createUser);
router.post("/auth", validateRequest(bodySchema), authenticateUser);

module.exports = router;
