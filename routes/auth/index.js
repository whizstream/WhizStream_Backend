const route = require("express").Router();

// controllers
const authController = require("../../controller/auth/authController");

route.post("/register", authController.authRegister);
route.post("/login", authController.authLogin);
module.exports = route;
