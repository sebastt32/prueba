const jsonApiTrait = require("../traits/jsonApi.trait");

function notFound(req, res, _next) {
  res.status(404).json(
    jsonApiTrait.errorPayload(404, "Not Found", `Route ${req.originalUrl} does not exist`)
  );
}

module.exports = notFound;
