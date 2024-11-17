const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
module.exports.getHome = (req, res) => {
  res.render("home");
};

module.exports.getLogin = (req, res) => {
  res.render("login");
};

module.exports.getRegister = (req, res) => {
  res.render("register");
};

module.exports.getDashboard = (req, res) => {
  console.log(req.session);
  console.log(req.user);
  res.render("dashboard");
};

module.exports.postRegister = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 11),
    });
    res.render("login");
  } catch (error) {
    console.log("The error occured at postRegister", ` ${error}`);
  }
};

module.exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};
