const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiRouter = require("./app/routes");
const notFound = require("./app/middlewares/notFound");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();

app.disable("x-powered-by");

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
