const response = require("../../utils/response");
const userModel = require("../../db/models/user");
const bcrypt = require("bcryptjs");

const authRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  check that all fields are filled
    if (!username || !email || !password) {
      return response(res, 400, "All fields are required");
    }

    // check that username and email are unique
    let user = await userModel.findOne({ where: { email } });
    if (user) {
      return response(res, 400, "User with this email already exists");
    }
    user = await userModel.findOne({ where: { username } });
    if (user) {
      return response(res, 400, "User with this username already exists");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await userModel.create({
      username,
      email,
      password: encryptedPassword,
    });

    return response(res, 200, "User created successfully", null);
  } catch (error) {
    return response(res, 400, error.message);
  }
};

module.exports = authRegister;
