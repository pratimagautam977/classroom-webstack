const express = require("express");
let payments = express.Router();
const cors = require("cors");
const Institute = require("../models/institute");
const Student = require("../models/student");
const uuidv4 = require('uuid/v4');
const Payment = require("../models/payment");

payments.use(cors());
const axios = require('axios');

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

Payment.belongsTo(Student, {
    foreignKey: {
       name: 'studID'
    }
  });
Student.hasMany(Payment);


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

payments.post('/create', middleware.checkToken, (req, res) =>{
  
    const paymentData = {
        insID: req.decoded.id,
        studID:req.body.uuid,
        requestID: uuidv4(),
        amount: req.body.amount,
        status: false
    }
    Payment.create(paymentData)
    .then(payment => {
        res.status(200).json({status: "OK"})
    }).catch(err => {
        console.log(err);
    })
})

// Getting all the request posted by institute
payments.get('/', middleware.checkToken, (req, res) => {
    Payment.findAll({
        where: {
            insID: req.decoded.id
        },
        attributes: ['requestID', 'amount'],
        include : [{
            model: Student ,               
            attributes: ['studID','fname', 'lname', 'img']
        }]
    })
    
    .then(payment => {
        res.status(200).json({status: "OK", payment})
    })
    .catch(err => {
        res.send(err);
    })
})

// Payment Route
payments.post('/payment', (req, res) => {
    let data = {
        token: req.body.token,
        amount: req.body.amount
    }
    
    let config = {
        headers: {'Authorization': 'Key live_secret_key_70d7cc81b96245488185350a3ccf7768'}
    };
    
    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error.response.data);
    });
})

module.exports = payments;