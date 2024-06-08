const route = require("express").Router();

//controllers
const videoController = require("../../controller/video/videoController");

//middlewares
const requireAuth = require("../../middleware/auth/jwtverify");

route.get("/getAll", videoController.getVideos);
route.post("/upload", requireAuth, videoController.uploadVideo);

module.exports = route;
