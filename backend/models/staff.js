const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'staff',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        }, 
        staffID: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            field: "staff_uuid",
        },
        ins_uuid: {
            type:Sequelize.UUIDV4
        },
        fname: {
            type: Sequelize.STRING,
            field: "staff_fname",
        },
        lname: {
            type: Sequelize.STRING,
            field: "staff_lname",
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "staff_email",
        },
        address: {
            type: Sequelize.STRING,
            field: "staff_address",
        },
        phone: {
            type: Sequelize.INTEGER,
            field: "staff_phone",
        },
        img: {
            type: Sequelize.STRING,
            field: "staff_img",
        },
        type: {
            type: Sequelize.STRING,
            field: "staff_type",
        },
        added_at: {
            type: Sequelize.DATE,
            field: "staff_added_at",
        },
        password: {
            type: Sequelize.STRING,
            field: "staff_password",
        }
    },
    {
        freezeTableName: true,
        tableName: 'tbl_staff'
    }
);