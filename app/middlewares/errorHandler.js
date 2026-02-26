const jsonApiTrait = require("../traits/jsonApi.trait");

function errorHandler(err, _req, res) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const title = statusCode >= 500 ? "Server Error" : "Request Error";

  res.status(statusCode).json(jsonApiTrait.errorPayload(statusCode, title, message));
}

module.exports = errorHandler;
