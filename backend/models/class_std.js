const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_class_std',
        {
            classID: {
                type: Sequelize.STRING,
                field: "class_uuid"
            },
            studID: {
                type: Sequelize.STRING,
                field: "stud_uuid"
                
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_class_std'
        }
)