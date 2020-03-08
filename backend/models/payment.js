const Sequelize = require("sequelize");
const db = require("../config/config");


module.exports = db.sequelize.define(
    'tbl_payment',
    {
        payment_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studID: {
            type: Sequelize.UUIDV4,
            field: 'stud_uuid'
        },
        requestID: {
            type:Sequelize.UUIDV4 ,
            field: 'request_id'
        },
        requestDate: {
            type: Sequelize.DATE,
            field: 'request_date'
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        insID: {
            type: Sequelize.STRING,
            field: 'ins_uuid'
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)