const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'tbl_student',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        }, 
        stud_uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        ins_uuid: {
            type:Sequelize.UUIDV4
        },
        stud_fname: {
            type: Sequelize.STRING
        },
        stud_lname: {
            type: Sequelize.STRING
        },
        stud_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stud_address: {
            type: Sequelize.STRING
        },
        stud_phone: {
            type: Sequelize.INTEGER
        },
        stud_img: {
            type: Sequelize.STRING
        },
        stud_added_at: {
            type: Sequelize.DATE
        },
        stud_username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stud_password: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true
    }
);