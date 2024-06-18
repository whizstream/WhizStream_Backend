const response = require("../../utils/response");
const userModel = require("../../db/models/user");
const jwt = require("jsonwebtoken");

const generateUsername = (email) => {
  const time = new Date().getTime();
  const last3Digits = time.toString().slice(-3);
  email = email.split("@")[0];
  email = email.replace(/[^a-zA-Z0-9]/g, "");
  email = email.slice(0, 5);
  return `${email}${last3Digits}`;
};

const authGoogleSuccess = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      const data = {
        googleSub: user.id,
        firstName: user.name.givenName,
        lastName: user.name.familyName,
        email: user.emails[0].value,
        profilePic: user.photos[0].value,
        username: generateUsername(user.emails[0].value),
      };

      // check that user exists
      const userExists = await userModel.findOne({
        where: { googleSub: data.googleSub },
      });
      if (!userExists) {
        console.log("no");
        const newUser = new userModel(data);
        await newUser.save();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        return response(res, 200, "User logged in successfully", {
          ...data,
          token,
        });
      } else {
        console.log("yes");
        const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);
        return response(res, 200, "User logged in successfully", {
          ...data,
          token,
        });
      }
    } else {
      return response(res, 400, "Internal server error");
    }
  } catch (error) {
    return response(res, 500, "Internal server error", error);
  }
};

module.exports = authGoogleSuccess;
