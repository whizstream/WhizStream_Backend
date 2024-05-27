const response = require("../../utils/response");
const userModel = require("../../db/models/user");
const jwt = require("jsonwebtoken");

const generateUsername = (firstName, lastName) => {
  const time = new Date().getTime();
  const last3Digits = time.toString().slice(-3);
  const username = `${firstName.substring(0, 2)}${lastName.substring(
    0,
    2
  )}${last3Digits}`;
  return username;
};

const authGoogleSuccess = async (req, res) => {
  try {
    const user = req.user;
    const data = {
      googleSub: user.id,
      firstName: user.name.givenName,
      lastName: user.name.familyName,
      email: user.emails[0].value,
      profilePic: user.photos[0].value,
      username: generateUsername(user.name.givenName, user.name.familyName),
    };

    // check that user exists
    const userExists = await userModel.findOne({ googleSub: data.googleSub });
    console.log(userExists);
    if (!userExists) {
      const newUser = new userModel(data);
      await newUser.save();
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      return response(res, 200, "User logged in successfully", {
        ...data,
        token,
      });
    } else {
      const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);
      return response(res, 200, "User logged in successfully", {
        ...data,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal server error", error);
  }
};

module.exports = authGoogleSuccess;
