const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/api/logout");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/api/logout");
  }
};

module.exports = requireAuth;
