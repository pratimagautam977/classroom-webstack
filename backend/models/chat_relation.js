const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
  "tbl_chat_relation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender1_uuid: {
      type: Sequelize.UUIDV4,
    },
    sender2_uuid: {
      type: Sequelize.UUIDV4,
    },
    channel_id: {
      type: Sequelize.UUIDV4,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamp: false,
    tableName: "tbl_chat_relation",
  }
);
