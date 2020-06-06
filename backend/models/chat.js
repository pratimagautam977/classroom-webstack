const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
  "tbl_chat",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_uuid: {
      type: Sequelize.UUIDV4,
    },
    channel_id: {
      type: Sequelize.UUIDV4,
    },
    text: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamp: false,
    tableName: "tbl_chat",
  }
);
