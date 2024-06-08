const response = require("../../utils/response");
const userModel = require("../../db/models/user");
const videoModel = require("../../db/models/video");

const jwt = require("jsonwebtoken");

const uploadVideo = async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.cookies.token || null;
    const { VideoID } = req.body;

    if (!VideoID) {
      return response(res, 400, "Video ID is required");
    }

    if (!token) {
      return response(res, 401, "Unauthorized");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    const user = await userModel.findOne({
      where: { id: data.id },
    });

    if (!user) {
      return response(res, 400, "User not found");
    }

    const newVideo = new videoModel({
      VideoID,
      UserID: user.id,
      Title: "Title",
      Views: 0,
    });

    await newVideo.save();
    return response(res, 200, "Video uploaded successfully", newVideo);
  } catch (err) {
    return response(res, 400, err.message);
  }
};

module.exports = {
  uploadVideo,
};
