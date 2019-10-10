const Sequalize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_institute',
    {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true
        },
        ins_uuid: {
            type: Sequalize.UUIDV4,
            primaryKey: true,
        },
        ins_logo: {
            type: Sequalize.STRING
        },
        ins_email: {
            type: Sequalize.STRING,
            allowNull: false,
            unique: true
        },
        ins_address: {
            type:Sequalize.STRING
        },
        ins_type: {
            type: Sequalize.STRING
        },
        ins_phone: {
            type:Sequalize.INTEGER
        },
        ins_password: {
            type: Sequalize.STRING
        },
        ins_uname: {
            type: Sequalize.STRING,
            unique: true
        },
        created_at: {
            type: Sequalize.DATE
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)