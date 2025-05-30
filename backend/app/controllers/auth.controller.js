const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const RefreshToken = require("../models/refreshToken.model");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save()
    .then(user => {
      if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles } })
          .then(roles => {
            user.roles = roles.map(role => role._id);
            return user.save();
          })
          .then(() => res.send({ message: "User was registered successfully!" }))
          .catch(err => res.status(500).send({ message: err }));
      } else {
        Role.findOne({ name: "doctor" })
          .then(role => {
            user.roles = [role._id];
            return user.save();
          })
          .then(() => res.send({ message: "User was registered successfully!" }))
          .catch(err => res.status(500).send({ message: err }));
      }
    })
    .catch(err => res.status(500).send({ message: err }));
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    const refreshToken = await RefreshToken.createToken(user);

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken
    });

  } catch (err) {
    res.status(500).send({ message: err.message || "Internal server error" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};