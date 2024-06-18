const { Sequelize } = require("sequelize");

const config = require("./config");

let mode = "development";
const sequelize = new Sequelize(config[mode]);

module.exports = sequelize;
