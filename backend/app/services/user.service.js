// app/services/user.service.js
const db = require("../models");
const User = db.user;

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getAllUsers = async (name) => {
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  return await User.find(condition);
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUserById = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.deleteAllUsers = async () => {
  return await User.deleteMany({});
};
