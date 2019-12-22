const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_assignment',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: "assign_name"
            },
            details: {
                type: Sequelize.STRING,
                field: "assign_details"
            },
            staffID: {
                type: Sequelize.UUIDV4,
                field: "staff_uuid"
            },
            classID: {
                type:Sequelize.UUIDV4,
                field: "class_uuid"
            },
            assignmentDate: {
                type: Sequelize.DATE,
                field: "assign_date"
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_assignment'
        }
)