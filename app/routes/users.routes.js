const express = require("express");

const {
  listUsers,
  getUserById,
  createUser,
} = require("../controllers/users.controller");
const { validateCreateUser } = require("../requests/users.request");

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", validateCreateUser, createUser);

module.exports = router;
