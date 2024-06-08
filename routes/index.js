const express = require("express");
const route = express.Router();

// import routes
const test = require("./test");
const auth = require("./auth");
const user = require("./user");
const video = require("./video");

// use routes
route.use("/test", test);
route.use("/auth", auth);
route.use("/user", user);
route.use("/video", video);

module.exports = route;
