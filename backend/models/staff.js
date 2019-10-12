const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'tbl_staff',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        }, 
        staff_uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        ins_uuid: {
            type:Sequelize.UUIDV4
        },
        staff_fname: {
            type: Sequelize.STRING
        },
        staff_lname: {
            type: Sequelize.STRING
        },
        staff_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        staff_address: {
            type: Sequelize.STRING
        },
        staff_phone: {
            type: Sequelize.INTEGER
        },
        staff_img: {
            type: Sequelize.STRING
        },
        staff_type: {
            type: Sequelize.STRING
        },
        staff_added_at: {
            type: Sequelize.DATE
        },
        staff_password: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true
    }
);