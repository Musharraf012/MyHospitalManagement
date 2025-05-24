const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    enum: ["super admin", "admin", "doctor", "nurse", "receptionist", "patient"],

  },
    { timestamps: true })
);

module.exports = Role;