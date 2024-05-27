const express = require("express");
const route = express.Router();

// import routes
const test = require("./test");
const auth = require("./auth");
const user = require("./user");

// use routes
route.use("/test", test);
route.use("/auth", auth);
route.use("/user", user);

module.exports = route;
