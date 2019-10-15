const Sequelize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_institute',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        ins_uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
        },
        ins_logo: {
            type: Sequelize.STRING
        },
        ins_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        ins_address: {
            type:Sequelize.STRING
        },
        ins_type: {
            type: Sequelize.STRING
        },
        ins_phone: {
            type:Sequelize.INTEGER
        },
        ins_password: {
            type: Sequelize.STRING
        },
        ins_uname: {
            type: Sequelize.STRING,
            unique: true
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