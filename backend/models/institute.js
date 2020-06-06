const Sequelize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_institute',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        insID: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            field: "ins_uuid"
        },
        name: {
            type: Sequelize.STRING,
            field: "ins_name"
        },
        logo: {
            type: Sequelize.STRING,
            field: "ins_logo"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            field: "ins_email"
        },
        address: {
            type:Sequelize.STRING,
            field: "ins_address"
        },
        type: {
            type: Sequelize.STRING,
            field: "ins_type"
        },
        phone: {
            type:Sequelize.BIGINT,
            field: "ins_phone"
        },
        password: {
            type: Sequelize.STRING,
            field: "ins_password"
        },
        uname: {
            type: Sequelize.STRING,
            unique: true,
            field: "ins_uname"
        },
        created_at: {
            type: Sequelize.DATE
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)