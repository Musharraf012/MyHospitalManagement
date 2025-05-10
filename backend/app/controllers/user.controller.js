// app/controllers/user.controller.js
const userService = require("../services/user.service");

exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = await userService.createUser({ name, email, password, role });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating user." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const name = req.query.name;
    const users = await userService.getAllUsers(name);
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving users." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found." });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving user." });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "Data to update can't be empty." });

    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    if (!updatedUser) return res.status(404).send({ message: "User not found." });

    res.send({ message: "User updated successfully.", user: updatedUser });
  } catch (err) {
    res.status(500).send({ message: "Error updating user." });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await userService.deleteUserById(req.params.id);
    if (!deleted) return res.status(404).send({ message: "User not found." });

    res.send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error deleting user." });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const result = await userService.deleteAllUsers();
    res.send({ message: `${result.deletedCount} users were deleted.` });
  } catch (err) {
    res.status(500).send({ message: "Error deleting all users." });
  }
};
