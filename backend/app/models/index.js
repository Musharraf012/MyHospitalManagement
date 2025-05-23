const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model.js")
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["super admin", "admin", "doctor","nurse", "receptionist", "patient"];

module.exports = db;