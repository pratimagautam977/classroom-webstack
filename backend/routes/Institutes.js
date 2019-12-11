const express = require("express");
let institutes = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institute = require("../models/institute");
const uuidv4 = require('uuid/v4');
institutes.use(cors());
const axios = require('axios');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Register Institute
institutes.post('/register', (req, res) => {
   const instituteData = {
       insID: "",
       email: req.body.email,
       phone: req.body.phone,
       uname: req.body.uname,
       password: req.body.password
   }

   Institute.findOne({
       where: {
           [Op.or]: [{email: req.body.email}, {uname: req.body.uname}]
           //SELECT * FROM post WHERE email = req.body.email OR uname = req.body.uname;
       }
   })
   .then(institute => {
       if(!institute){
           bcrypt.hash(req.body.password, 10, (err, hash) =>{
               instituteData.password = hash;
               instituteData.insID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
               Institute.create(instituteData)
               .then(institute => {
                   res.json({ status: institute.email + " Registered." });
               })
               .catch(err => {
                   res.send(err);
               });
           });
        } else {
           res.json({ error: "Institute already exists"});
       }
   })
   .catch(err =>{
       res.send(err);
   })
});

// Login Institute
institutes.post("/login", (req, res) => {
    Institute.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(institute =>{
        if(institute){
            if(bcrypt.compareSync(req.body.password, institute.password)){                
                let token = jwt.sign({id: institute.insID, isAdmin: true, isStaff: false, isStudent: false}, process.env.APP_SECRET, {
                    expiresIn: 86400
                })
                res.send({token})
            }
            else{
                res.status(403).json({error: 'Wrong Credentials'})
            }
        }else{
            res.status(400).json({error: 'Institute does not exists'})
        }
    })
    .catch(err=>{
        res.status(400).json(err)
        console.log(err)
    })
})

// Payment Route
institutes.post('/payment', (req, res) => {
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

module.exports = institutes;