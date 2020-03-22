const express = require("express");
let students = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const uuidv4 = require('uuid/v4');
students.use(cors());

const db = require('../config/config');

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

// POST Registration Route (Add Student)
students.post("/", middleware.checkToken, (req, res) => {
    const studentData = {
        studID: "",
        ins_uuid: req.decoded.id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        img: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        username: req.body.username,
        password: req.body.password,
    }

    Student.findOne({
        where: {
            email: req.body.email,
            ins_uuid: studentData.ins_uuid
        }
    })
    .then(student => {
        if(!student){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                studentData.password = hash;
                studentData.studID = uuidv4();
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
students.get("/", middleware.checkToken, (req, res) => {
    Student.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
        attributes: ['studID', 'fname', 'lname' , 'email', 'phone', 'img']
    })
    .then(student => {
        res.status(200).json({status: "OK", student})
    })
    .catch(err => {
        res.send(err);
    })
})

// GET all the classroom of the student
students.get('/classroom', middleware.checkToken, (req, res) => {
    db.sequelize.query(`SELECT classroom.class_uuid AS classID, classroom.class_name AS name, classroom.class_img AS img from tbl_class_std cf LEFT JOIN tbl_student st on st.stud_uuid = cf.stud_uuid LEFT JOIN tbl_classroom classroom on classroom.class_uuid = cf.class_uuid where cf.stud_uuid = "${req.decoded.login}"`,{ type: db.sequelize.QueryTypes.SELECT })
    
    .then(results => {
        res.json(results);
     })
    .catch( err => {
        res.send(err)
    });
})

// GET Route to retrieve a single student <findOne>
students.get("/:id", middleware.checkToken, (req, res) => {
    Student.findOne({
        where: {
            ins_uuid:req.decoded.id,
            studID: req.params.id
        },
        attributes: ['studID', 'fname', 'lname' , 'email', 'phone', 'address', 'img']
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
            email: req.body.email
        }
    })
    .then(student => {
        if (student) {
            if(bcrypt.compareSync(req.body.password, student.password)){
                let token = jwt.sign({id: student.ins_uuid, login: student.studID,  isAdmin: false, isStaff: false, isStudent: true}, process.env.APP_SECRET, {
                    expiresIn: 86400
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

// DELETE Student Route
students.delete('/:id', middleware.checkToken, (req, res) => {
    Student.destroy({
        where: {
            studID : req.params.id, 
            ins_uuid: req.decoded.id
        }
    })
    .then(student => {
        res.status(200).json({status: "Ok"})
    })
    .catch(err => {
        res.send(err);
    })
})

//UPDATE Student Route
students.put('/:id', middleware.checkToken, (req, res) => {
    var password = req.body.password;
    var StudentData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,   
    }    
    if(password !== undefined){
        if(password.length !== 0){                                          
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));        
            Object.assign(StudentData, {password});            
        }           
    }
    
    Student.update(StudentData,{
        where: {
            studID : req.params.id
        }
    })
    .then(student => {
        res.status(200).json({student})
    })
    .catch(err => {
        res.send(err);
    })
    
})
module.exports = students;