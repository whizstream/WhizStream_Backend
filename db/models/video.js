"use strict";
const { Sequelize } = require("sequelize");

const sequelize = require("../../config/database");
const video = sequelize.define(
  "Videos",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    VideoID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    UserID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    Title: {
      type: Sequelize.STRING,
    },
    Description: {
      type: Sequelize.TEXT,
    },
    ThumbnailPath: {
      type: Sequelize.STRING,
    },
    Views: {
      type: Sequelize.INTEGER,
    },
    Processing: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
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
    tableName: "Videos",
    sequelize,
    modelName: "Videos",
  }
);

module.exports = video;
