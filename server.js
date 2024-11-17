const express = require("express");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./router/userRoute");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const { passportConfig } = require("./config/passportConfig");
//! middlewares
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Passport",
      collectionName: "passport-sessions",
    }),
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//!DB create
mongoose
  .connect("mongodb://localhost:27017/Passport")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("db not connected sucessfully");
  });

//!Using the routers

app.use("/", userRouter);

app.listen(
  PORT,
  console.log("server is running at " + `http://localhost:${PORT}`)
);
