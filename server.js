// load env variables
require("dotenv").config();

// import required modules
const cors = require("cors");
const express = require("express");
const cookies = require("cookie-parser");
// const passport = require("passport");
const session = require("express-session");

// routes
const routes = require("./routes");

const PORT = process.env.PORT || process.env.API_PORT;

// create express app and configure it
const app = express();
app.use(session({ secret: "SECRET" }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookies());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    data: "server is running",
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
