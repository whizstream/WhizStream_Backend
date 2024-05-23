const jwt = require("jsonwebtoken");

createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "7d", // 1 week
  });
};

module.exports = createToken;
