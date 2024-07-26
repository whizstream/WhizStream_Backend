const { uploadVideo } = require("./uploadVideo");
const { getVideos } = require("./getVideos");
const { getMyVideos } = require("./getMyVideos");

const controller = {
  uploadVideo,
  getVideos,
  getMyVideos
};

module.exports = controller;
