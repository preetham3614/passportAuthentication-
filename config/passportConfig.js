const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

// const passportConfig = function (passport) {
//   passport.use(
//     new LocalStrategy(async (username, password, done) => {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       } else {
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password." });
//         }
//         return done(null, user);
//       }
//     })
//   );

//   // passport.serializeUser(function (user, done) {
//   //   done(null, user.id);
//   // });

//   // passport.deserializeUser(async function (id, done) {
//   //   try {
//   //     const user = await User.findById(id);
//   //     done(null, user);
//   //   } catch (error) {
//   //     done(error);
//   //   }
//   // });
// };

const passportConfig = function (passport) {
  // Define the local strategy for email and password authentication
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          //find the user
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, {
              message: "User not found with that email",
            });
          }
          // Compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }
          // Authentication successful, return the user object
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //serializeUser: Determines which data of the user object should be stored in the session. Here, we store the user ID.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //Deserialize the user object based on the user ID stored in the session
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
module.exports = { passportConfig };
