const express = require("express");

const healthRouter = require("./health.routes");
const usersRouter = require("./users.routes");

const router = express.Router();

router.use("/health", healthRouter);
router.use("/users", usersRouter);

module.exports = router;
