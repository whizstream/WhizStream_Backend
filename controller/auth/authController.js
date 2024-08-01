const authLogin = require("./authLogin");
const authRegister = require("./authRegister");
const authGoogleSuccess = require("./authGoogleSuccess");
const authGoogleLogin = require("./authGoogleLogin");

const controller = {
  authLogin,
  authRegister,
  authGoogleSuccess,
  authGoogleLogin
};

module.exports = controller;
