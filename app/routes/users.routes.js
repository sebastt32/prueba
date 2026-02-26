const express = require("express");

const {
  listUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateCreateUser } = require("../requests/users.request");

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", validateCreateUser, createUser);
router.delete("/:id", deleteUser);

module.exports = router;
