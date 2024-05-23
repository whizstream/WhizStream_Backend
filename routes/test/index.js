const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    data: "test route",
  });
});

module.exports = route;
