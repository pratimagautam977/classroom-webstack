const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'tbl_student',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        }, 
        uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            field: "stud_uuid"
        },
        ins_uuid: {
            type:Sequelize.UUIDV4
        },
        fname: {
            type: Sequelize.STRING,
            field: "stud_fname"
        },
        lname: {
            type: Sequelize.STRING,
            field: "stud_lname"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "stud_email"
        },
        address: {
            type: Sequelize.STRING,
            field: "stud_address"
        },
        phone: {
            type: Sequelize.INTEGER,
            field: "stud_phone"
        },
        img: {
            type: Sequelize.STRING,
            field: "stud_img"
        },
        added_at: {
            type: Sequelize.DATE,
            field: "stud_added_at"
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "stud_username"
        },
        password: {
            type: Sequelize.STRING,
            field: "stud_password"
        }
    },
    {
        freezeTableName: true
    }
);