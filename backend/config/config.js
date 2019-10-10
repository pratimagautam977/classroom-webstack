const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("dbclassroom", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
}) 
db.sequelize = sequelize

module.exports = db