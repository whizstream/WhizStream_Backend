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

const authGoogleLogin = async (req, res) => {
  try {
    const { googleSub, email, profilePic } = req.body;

    if (!googleSub || !email || !profilePic) {
      return response(res, 400, "All fields are required");
    }
    const data = {
      googleSub: googleSub,
      email: email,
      profilePic: profilePic,
      username: generateUsername(email)
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

  }
  catch (error) { }
};

module.exports = authGoogleLogin;
