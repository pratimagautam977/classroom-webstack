const express = require("express");
let institutes = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institute = require("../models/institute");
const uuidv4 = require('uuid/v4');
institutes.use(cors());

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Register Institute
institutes.post('/register', (req, res) => {
   const instituteData = {
       ID: "",
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
               instituteData.ID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
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
                let token = jwt.sign({id: institute.ID, isAdmin: true}, process.env.APP_SECRET, {
                    expiresIn: 1440
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

module.exports = institutes;