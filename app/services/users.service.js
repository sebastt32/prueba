const UserModel = require("../models/user.model");

async function getAllUsers() {
  return UserModel.all();
}

async function getUserById(id) {
  const user = await UserModel.find(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

async function createUser(payload) {
  const users = await UserModel.all();
  const duplicated = users.find((user) => user.email === payload.email);

  if (duplicated) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  return UserModel.create(payload);
}

async function deleteUser(id) {
  const user = await UserModel.find(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await UserModel.delete(id);

  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
