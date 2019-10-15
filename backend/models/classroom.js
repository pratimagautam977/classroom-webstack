const Sequalize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_classroom',
    {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true
        },
        class_uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        ins_uuid: {
            type:Sequelize.UUIDV4
        },
        class_name: {
            type: Sequalize.STRING
        },
        class_created_at: {
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