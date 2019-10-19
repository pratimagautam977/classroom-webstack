const Sequelize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_classroom',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        classID: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            field: 'class_uuid'
        },
        ins_uuid: {
            type:Sequelize.UUIDV4 
        },
        name: {
            type: Sequelize.STRING,
            field: 'class_name'
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'class_created_at'
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)