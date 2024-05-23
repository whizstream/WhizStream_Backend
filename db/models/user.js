"use strict";
const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "Users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    profilePic: {
      type: Sequelize.STRING,
    },
    savedVideos: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: "Users",
    sequelize,
    modelName: "Users",
  }
);
