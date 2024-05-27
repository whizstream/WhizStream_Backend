const route = require("express").Router();

//controllers
const userController = require("../../controller/user/userController");

//middlewares
const requireAuth = require("../../middleware/auth/jwtverify");

route.post("/getUserByJWT", requireAuth, userController.getUserByJWT);

module.exports = route;
