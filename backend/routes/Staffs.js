const express = require("express");
let staffs = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const uuidv4 = require('uuid/v4');
staffs.use(cors());

// GET Route to retrieve all staffs <findAll>
staffs.get("/", (req, res)=>{

});

// GET Route to retrieve a single staff <findOne>
staffs.get("/:id")

// POST Route create <create>
staffs.post("/", (req, res)=> {

    //object
    const staffData = {
        staff_uuid: "",
        ins_uuid: "035f93a5-2f92-4cc1-9668-3103da7ce5e8",
        staff_fname: req.body.fname,
        staff_lname: req.body.lname,
        staff_email: req.body.email,
        staff_address: req.body.address,
        staff_phone: req.body.phone,
        staff_img: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        staff_password: req.body.password        
    }

    Staff.findOne({
        where: {
            staff_email: req.body.email,
            ins_uuid: "035f93a5-2f92-4cc1-9668-3103da7ce5e8"
        }
    })
    .then(staff => {
        if (!staff){
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                staffData.staff_password = hash;
                staffData.staff_uuid = uuidv4();
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
            staff_email: req.body.email
        }
    })
    .then(staff => {
        if(staff){
            if(bcrypt.compareSync(req.body.password, staff.staff_password)){
                let token = jwt.sign({id: staff.staff_uuid }, "icp-staff", {
                    expiresIn: 1440
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
staffs.delete("/:id");


module.exports = staffs;