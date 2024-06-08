const { uploadVideo } = require("./uploadVideo");
const { getVideos } = require("./getVideos");

const controller = {
  uploadVideo,
  getVideos,
};

module.exports = controller;
