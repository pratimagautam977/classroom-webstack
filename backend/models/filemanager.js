const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'tbl_filemanager',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type:Sequelize.UUIDV4, 
            field: "uuid_name" 
        },
        filename: {
            type: Sequelize.STRING
        },
        date_created: {
            type: Sequelize.DATE
        },
        filetype: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        uploader_uuid:{
            type: Sequelize.UUIDV4
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)