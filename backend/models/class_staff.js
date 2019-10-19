const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_class_staff',
        {
            classID: {
                type: Sequelize.STRING,
                field: "class_uuid"
            },
            staffID: {
                type: Sequelize.STRING,
                field: "staff_uuid"
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_class_staff'
        }
)