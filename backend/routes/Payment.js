const express = require("express");
let payments = express.Router();
const cors = require("cors");
const Student = require("../models/student");
const uuidv4 = require('uuid/v4');
const Payment = require("../models/payment");

payments.use(cors());
const axios = require('axios');

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################


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
    Payment.belongsTo(Student, {
        foreignKey: {
           name: 'studID'
        }
      });
    Student.hasMany(Payment);

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
payments.post('/verify', middleware.checkToken, (req, res) => {
    let data = {
        token: req.body.token,
        amount: req.body.amount
    }
    
    let config = {
        headers: {'Authorization': 'Key test_secret_key_d24c2b1c762a41f681786b8d6f4b6194'}
    };
    
    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
        console.log("It works")
        Payment.update({
            status: true
        },
        {
            where: {
                requestID :  req.body.request_id
            }
        })
        .then(done =>{
            res.status(200).json({status: "Ok", res: done})
        })
        .catch(err =>{
            // console.log(err.result)
            res.status(404).json({status: false, err});
        })
    })
    .catch(error => {
        console.log("It doesn't work")
        // res.send(error.res);
        res.status(404).json({status: false, error});
    });
})

payments.get('/student', middleware.checkToken, (req, res) => {
    
    Payment.findAll({
        where: {
            studID: req.decoded.login
        }
    })
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err.response)
    })

})

// call /:id request parameter id
payments.get('/:id', middleware.checkToken, (req, res) => {
    Payment.findAll({
        where: {
            requestID: req.params.id
        }
    })
    .then(result => { 
        res.status(200).json({status: "Ok", res: result})
    })
    .catch(err => {
        // res.status(404).json({status: false});
        // // res.send(err.res);
        res.status(404).json({status: false, err});
        //console.log(res);
    })  
})



module.exports = payments;