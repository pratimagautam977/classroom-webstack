const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_calendar',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING
            },
            start: {
                type: Sequelize.DATE
            },
            end: {
                type: Sequelize.DATE
            },
            uuid: {
                type: Sequelize.STRING
            }, 
            type: {
                type: Sequelize.STRING
            },
            view: {
                type: Sequelize.INTEGER
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_calendar'
        }
)