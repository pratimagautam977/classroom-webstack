const express = require("express");
let students = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const uuidv4 = require('uuid/v4');
students.use(cors());

// POST Registration Route 
students.post("/", (req, res) => {
    const studentData = {
        student_uuid: "",
        ins_uuid: "035f93a5-2f92-4cc1-9668-3103da7ce5e8",
        stud_fname: req.body.fname,
        stud_lname: req.body.lname,
        stud_email: req.body.email,
        stud_address: req.body.address,
        stud_phone: req.body.phone,
        stud_img: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        stud_username: req.body.username,
        stud_password: req.body.password,
    }

    Student.findOne({
        where: {
            stud_email: req.body.email,
            ins_uuid: studentData.ins_uuid
        }
    })
    .then(student => {
        if(!student){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                studentData.stud_password = hash;
                studentData.stud_uuid = uuidv4();
                Student.create(studentData)
                .then(student => {
                    res.status(200).json({
                        status: "Student Successfully Added."
                    });
                })
                .catch(err => {
                    res.send(err);
                });
            });
        } else {
            res.status(400).json({
                error: "Student Already added to the database"
            });
        }
    })
    .catch(err => {
        res.send(err);
    })
})

// GET ALL Students
students.get("/", (req, res) => {
    Student.findAll({
        where: {
            ins_uuid: '035f93a5-2f92-4cc1-9668-3103da7ce5e8'
        },
        attributes: ['stud_uuid', 'stud_fname', 'stud_lname' , 'stud_email', 'stud_phone', 'stud_img']
    })
    .then(student => {
        res.status(200).json({status: "OK", student})
    })
    .catch(err => {
        res.send(err);
    })
})

// GET Route to retrieve a single student <findOne>
students.get("/:id", (req, res) => {
    Student.findOne({
        where: {
            ins_uuid:'035f93a5-2f92-4cc1-9668-3103da7ce5e8',
            stud_uuid: req.params.id
        },
        attributes: ['stud_uuid', 'stud_fname', 'stud_lname' , 'stud_email', 'stud_phone', 'stud_address', 'stud_img']
    })
    .then(student => {
        res.status(200).json({status: "Ok", student})
    })
    .catch(err => {
        res.send(err);
    })
})

// POST Login Route 
students.post('/login', (req, res) => {
    Student.findOne({
        where: {
            stud_email: req.body.email
        }
    })
    .then(student => {
        if (student) {
            if(bcrypt.compareSync(req.body.password, student.stud_password)){
                let token = jwt.sign({id: student.stud_uuid}, "icp-student", {
                    expiresIn: 1440
                })
                res.send({token});
            } else{
                res.status(403).json({error: 'Wrong Credentials'})
            }
        }else{
            res.status(400).json({error: 'Student doesn\'t exist'})
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(errr);
    })
})
module.exports = students;