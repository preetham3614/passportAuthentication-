const express = require("express");
const controllers = require("../controllers/userControllers");
userRouter = express.Router();
const passport = require("passport");
const { isAuthenticate } = require("../middlewares/authenticate");
// const LocalStrategy = require("passport-local").Strategy;

userRouter.get("/", controllers.getHome);
userRouter.get("/register", controllers.getRegister);
userRouter.get("/login", controllers.getLogin);
userRouter.get("/dashboard", controllers.getDashboard);

userRouter.post("/register", controllers.postRegister);

userRouter.post("/login", controllers.login);

module.exports = { userRouter };
