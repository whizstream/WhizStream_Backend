const response = require("../../utils/response");
const userModel = require("../../db/models/user");
const jwt = require("jsonwebtoken");

const getUserByJWT = async (req, res) => {
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

    if (!user) {
      return response(res, 400, "User not found");
    }
    const { password, deletedAt, ...rest } = user.dataValues;

    return response(res, 200, "User found", rest);
  } catch (err) {
    return response(res, 400, err.message);
  }
};

module.exports = {
  getUserByJWT,
};
