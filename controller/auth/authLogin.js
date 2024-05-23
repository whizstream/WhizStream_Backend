const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../../utils/response");
const userModel = require("../../db/models/user");

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return response(res, 400, "All fields are required");
    }

    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return response(res, 400, "User with this email does not exist");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return response(res, 400, "Invalid password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      savedVideos: user.savedVideos,
      token,
    };
    return response(res, 200, "User logged in successfully", data);
  } catch (error) {
    return response(res, 400, error.message);
  }
};

module.exports = authLogin;
