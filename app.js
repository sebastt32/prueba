const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");

const apiRouter = require("./app/routes");
const notFound = require("./app/middlewares/notFound");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();

app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX || 200),
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    message: "API running",
    docs: "/api/v1/health",
  });
});

app.use("/api/v1", apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
