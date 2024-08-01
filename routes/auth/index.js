const route = require("express").Router();
const passport = require("passport");

// controllers
const authController = require("../../controller/auth/authController");

route.post("/register", authController.authRegister);
route.post("/login", authController.authLogin);
route.post("/login/google", authController.authGoogleLogin);

// google oAuth
route.get("/login/success", authController.authGoogleSuccess);

route.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

route.get("/google", passport.authenticate("google", ["profile", "email"]));

route.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/google`,
    failureRedirect: "/login/failed",
  })(req, res, next);
});

route.get("/logout", (req, res) => {
  res.json({
    status: "Failed",
    statusCode: 401,
  });
});

module.exports = route;
