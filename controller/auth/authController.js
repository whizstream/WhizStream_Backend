const authLogin = require("./authLogin");
const authRegister = require("./authRegister");
const authGoogleSuccess = require("./authGoogleSuccess");

const controller = {
  authLogin,
  authRegister,
  authGoogleSuccess,
};

module.exports = controller;
