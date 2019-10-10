// express, cors, body-parser, jwt, mysql, bcrypt, @hapi/joi, sequelize, nodemon,
const express = require('express');
const  user = require('./routes/userRoute');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// making route for institute
var Institutes = require("./routes/Institutes");
app.use("/institutes", Institutes);

app.listen(3000, console.log('Server started at port 3000'));
