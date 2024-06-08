const response = require("../../utils/response");
const videoModel = require("../../db/models/video");
const userModel = require("../../db/models/user");
const user = require("../../db/models/user");

const getVideos = async (req, res) => {
  try {
    // get all videos, and video's user
    const videos = await videoModel.findAll({
      include: {
        model: user,
        attributes: ["username"],
      },
    });

    return response(res, 200, "All videos", videos);
  } catch (err) {
    return response(res, 400, err.message);
  }
};

module.exports = {
  getVideos,
};
