const express = require("express");
let staffs = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const Institute = require("../models/institute");
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');
staffs.use(cors());

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

// implementing Joi schema
const registerValidation = data => {
    const schema = Joi.object({
        fname: Joi.string()
        .min(3)
        .max(15)
        .required()
        .label("Input Label"),
    
        lname: Joi.string()
        .min(3)
        .max(15)
        .required(),
    
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
        password: Joi.string()
        .pattern(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/),

        address: Joi.string()
        .min(3)
        .max(100)
        .required(),

        phone: Joi.string()
        .required()
        .pattern(/^[0-9]{8,14}$/),
        
    })
    return schema.validate(data);
}
 
// GET Route to retrieve all staffs <findAll>
staffs.get("/", middleware.checkToken, (req, res)=>{
    Staff.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
        attributes: ['staffID', 'fname', 'lname' , 'email', 'phone', 'address', 'img']
    })
    .then(staff => {
        res.status(200).json({status: "OK", staff})
    })
    .catch(err => {
        res.send(err);
    })
});

// GET Route to retrieve a single staff <findOne>
staffs.get("/:id", middleware.checkToken, (req, res) => {
    Staff.findOne({
        where: {
            ins_uuid:req.decoded.id,
            staffID: req.params.id
        },
        attributes: ['staffID', 'fname', 'lname' , 'email', 'phone', 'address', 'img']
    })
    .then(staff => {
        res.status(200).json({status: "Ok", staff})
    })
    .catch(err => {
        res.send(err);
    })
})

// POST Route Add Staff  <create>
staffs.post("/", middleware.checkToken, (req, res)=> {
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).json({error: error.details[0].message});
    //object
    const staffData = {
        staffID: "",
        ins_uuid: req.decoded.id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        img: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        password: req.body.password        
    }

    Staff.findOne({
        where: {
            email: req.body.email,
            ins_uuid: staffData.ins_uuid
        }
    })
    .then(staff => {
        if (!staff){
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                staffData.password = hash;
                staffData.staffID = uuidv4();
                Staff.create(staffData)
                .then(staff => {
                    //res.status(200).json({ status: "Successfully Added."});
                    //here write the mail function a common 
                    Institute.findOne({
                        where:{
                            ins_uuid: staffData.ins_uuid
                        }
                    })
                    .then(inst => {
                        console.log(inst.name);
                    })
                })
                .catch(err =>{
                    res.send(err);
                });
            });
        } else{
            res.status(400).json({
                error: "Staff already added!"
            });
        }
    })
    .catch(err => {
        res.send(err);
    })
});

// POST Login Route
staffs.post('/login', (req, res) => {
    Staff.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(staff => {
        if(staff){
            if(bcrypt.compareSync(req.body.password, staff.password)){
                let token = jwt.sign({id: staff.ins_uuid, login: staff.staffID , isAdmin: false, isStaff: true, isStudent: false }, process.env.APP_SECRET, {
                    expiresIn: 86400
                })
                res.send({token});
            }else{
                res.status(403).json({error: 'Wrong Credentials'});
            }
        }else{
            res.status(400).json({error: 'Staff does not exists'});
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    })

});

// DELETE Route <delete>
staffs.delete('/:id', middleware.checkToken, (req, res) => {
    Staff.destroy({
        where: {
            staffID : req.params.id, 
            ins_uuid: req.decoded.id
        }
    })
    .then(staff => {
        res.status(200).json({status: "Ok"})
    })
    .catch(err => {
        res.send(err);
    })
})

// Update Staff Route
staffs.put('/:id', middleware.checkToken, (req, res) => {

    var password = req.body.password
    var StaffData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    }
    if(password !== undefined){
        if(password.length !== 0){                                          
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));        
            Object.assign(StaffData, {password});            
        }           
    }

    Staff.update(StaffData, {
        where: {
            staffID: req.params.id
        }
    })
    .then(staff => {
        res.status(200).json({staff})
    })
    .catch(err => {
        res.send(err);
    })
})

module.exports = staffs;