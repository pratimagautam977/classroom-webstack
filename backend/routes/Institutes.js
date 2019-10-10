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
       ins_uuid: "",
       ins_email: req.body.ins_email,
       ins_phone: req.body.ins_phone,
       ins_uname: req.body.ins_uname,
       ins_password: req.body.ins_password
   }

   Institute.findOne({
       where: {
           [Op.or]: [{ins_email: req.body.ins_email}, {ins_uname: req.body.ins_uname}]
           //SELECT * FROM post WHERE ins_email = req.body.ins_email OR ins_uname = req.body.ins_uname;
       }
   })
   .then(institute => {
       if(!institute){
           bcrypt.hash(req.body.ins_password, 10, (err, hash) =>{
               instituteData.ins_password = hash;
               instituteData.ins_uuid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
               Institute.create(instituteData)
               .then(institute => {
                   res.json({ status: institute.ins_email + " Registered." });
               })
               .catch(err => {
                   res.send(err + " ==error");
               });
           });
        } else {
           res.json({ error: "Institute already exists"});
       }
   })
   .catch(err =>{
       res.send(err + " -->" + req.body.ins_password + " ++error");
   })
});

// Login Institute
institutes.post("/login", (req, res) => {
    Institute.findOne({
        where: {
            ins_email: req.body.ins_email
        }
    })
    .then(institute =>{
        if(institute){
            if(bcrypt.compareSync(req.body.ins_password, institute.ins_password)){
                let token = jwt.sign({id: institute.ins_uuid}, "icp-pokhara", {
                    expiresIn: 1440
                })
                res.send(token)
            }
            else{
                res.status(400).json({error: 'Wrong Credentials'})
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