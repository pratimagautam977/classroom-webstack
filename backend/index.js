// express, cors, body-parser, jwt, mysql, bcrypt, @hapi/joi, sequelize, nodemon,
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// making route for institute
var Institutes = require("./routes/Institutes");
app.use("/institute", Institutes);

// making route for staff
var Staffs = require("./routes/Staffs");
app.use("/staff", Staffs);

// making route for student
var Students = require("./routes/Students");
app.use("/student", Students);

// making route for classroom
var Classrooms = require("./routes/Classrooms");
app.use("/classroom", Classrooms);

// making route for payment
var Payments = require("./routes/Payment");
app.use("/pay", Payments);

// TEST DATA
// app.get('/test',(req,res)=>{
//     res.status(200).json({status: "okay"})
// })
// END OF TEST DATA

app.listen(3000, console.log('Server started at port 3000'));
