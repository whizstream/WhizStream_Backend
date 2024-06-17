const { Sequelize } = require("sequelize");

const config = require("./config");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}
const sequelize = new Sequelize(config[mode]);

module.exports = sequelize;
