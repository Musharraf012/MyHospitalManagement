const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            req.userId = decoded.id;
            next();
        });
};

const isSuperAdmin = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "super admin")) {
                return next();
            }

            return res.status(403).send({ message: "Require Super Admin Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "admin")) {
                return next();
            }

            return res.status(403).send({ message: "Require Admin Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const isDoctor = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "doctor")) {
                return next();
            }

            return res.status(403).send({ message: "Require Doctor Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const isNurse = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "nurse")) {
                return next();
            }

            return res.status(403).send({ message: "Require Nurse Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const isReceptionist = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "receptionist")) {
                return next();
            }

            return res.status(403).send({ message: "Require Receptionist Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const isPatient = (req, res, next) => {
    User.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return Role.find({ _id: { $in: user.roles } }).exec();
        })
        .then(roles => {
            if (!roles) {
                return res.status(500).send({ message: "Roles not found!" });
            }

            if (roles.some(role => role.name === "patient")) {
                return next();
            }

            return res.status(403).send({ message: "Require Patient Role!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

const authJwt = {
    verifyToken,
    isSuperAdmin,
    isAdmin,
    isDoctor,
    isNurse,
    isReceptionist,
    isPatient
};
module.exports = authJwt;