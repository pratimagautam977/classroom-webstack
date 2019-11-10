const express = require("express");
let staffs = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const uuidv4 = require('uuid/v4');
staffs.use(cors());

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

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
                    res.status(200).json({ status: "Successfully Added."});
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

// PUT Route <update>
staffs.put("/:id");

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
    password = req.body.password
    var StaffData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    }
    if(password !== ""){
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        Object.assign(StaffData, {password});
    }

    Staff.update(StaffData, {
        where: {
            staffData: req.params.id
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