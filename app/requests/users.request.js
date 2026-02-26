function validateCreateUser(req, _res, next) {
  const { name, email } = req.body || {};

  if (!name || typeof name !== "string" || !name.trim()) {
    const error = new Error("The field 'name' is required.");
    error.statusCode = 422;
    return next(error);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    const error = new Error("The field 'email' must be a valid email.");
    error.statusCode = 422;
    return next(error);
  }

  return next();
}

module.exports = {
  validateCreateUser,
};
