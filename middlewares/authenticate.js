const isAuthenticate = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(
      "error occured at the isAuthenticated middleware " + `${error}`
    );
  }
};

module.exports = { isAuthenticate };
