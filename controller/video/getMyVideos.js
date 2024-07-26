const response = require("../../utils/response");
const videoModel = require("../../db/models/video");
const userModel = require("../../db/models/user");
const jwt = require("jsonwebtoken");


const getMyVideos = async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.cookies.token || null;

    if (!token) {
      return response(res, 401, "Unauthorized");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      where: { id: data.id },
    });
    const username = user.dataValues.username;
    // get all videos, and video's user
    const videos = await videoModel.findAll({
      include: {
        model: userModel,
        attributes: ["username"],
      },
    });

    const myVideos = videos.filter((video) => video.User.username === username);


    return response(res, 200, "My videos", myVideos);
  } catch (err) {
    return response(res, 400, err.message);
  }
};

module.exports = {
  getMyVideos,
};

