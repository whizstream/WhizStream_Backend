const express = require("express");
const route = express.Router();

// import routes
const test = require("./test");
const auth = require("./auth");

// use routes
route.use("/test", test);
route.use("/auth", auth);

module.exports = route;
