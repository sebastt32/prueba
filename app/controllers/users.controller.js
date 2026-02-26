const usersService = require("../services/users.service");
const usersResource = require("../resources/users.resource");

async function listUsers(_req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    return res.status(200).json(usersResource.collection(users));
  } catch (error) {
    return next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);
    return res.status(200).json(usersResource.item(user));
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await usersService.createUser(req.body);
    return res.status(201).json(usersResource.item(user));
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await usersService.deleteUser(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  deleteUser,
};
