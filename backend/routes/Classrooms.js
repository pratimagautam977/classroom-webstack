const express = require("express");
let classrooms = express.Router();
const cors = require("cors");
const Classroom = require("../models/classroom"); //Classroom Model
const Staff = require("../models/staff"); // Staffs Model
const Student = require("../models/student"); // Student Model
const ClassStaff = require("../models/class_staff"); // Classroom and Staff Model
const ClassStud = require("../models/class_std"); // Classroom and Student Model
const Assignment  = require("../models/assignment"); // Assignment Model
const db = require('../config/config');

const uuidv4 = require('uuid/v4');
classrooms.use(cors());

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

Classroom.belongsToMany(Student, {through: ClassStud, foreignKey: 'classID'})
Student.belongsToMany(Classroom, {through: ClassStud, foreignKey: 'studID'})
Classroom.belongsToMany(Staff, {through: ClassStaff, foreignKey: 'classID'})
Staff.belongsToMany(Classroom, {through: ClassStaff, foreignKey: 'staffID'})
// Classroom.belongsToMany(Assignment, {through: ClassStaff, foreignKey: 'staffID'})

Assignment.belongsTo(Classroom)
Assignment.belongsTo(Staff)

// POST Route 
classrooms.post("/", middleware.checkToken, (req, res) => {
    const classData = {
        ID: "",
        ins_uuid: req.decoded.id,
        name: req.body.name
    }

    classData.class_uuid = uuidv4();
    Classroom.create(classData)
    .then(classroom => {
        res.status(200).json({
            status: "Classroom Successfully Created."
        });
    })
    .catch(err => {
        res.send(err);
    })
})

// GET Route
classrooms.get("/", middleware.checkToken, (req, res) => {
    Classroom.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
        attributes: ['classID', 'name', 'createdAt','img'],
        include: [ 
            {
                model: Student ,
                // where: {
                //     ins_uuid: req.decoded.id
                // },
                
                attributes: ['studID','fname', 'lname', 'img'],
                through: { attributes: [] }              
            },
            {
                model: Staff,
                // where: {
                //     ins_uuid: req.decoded.id
                // },
                
                attributes: ['staffID', 'fname', 'lname', 'img'],
                through: { attributes: []}
            }              
        ]
    })
    .then(classroom => {
        res.status(200).json({status: "OK", classroom})
    })
    .catch(err => {
        res.send(err);
    })
})

classrooms.post('/assignment', (req, res) =>{
    
    db.sequelize.query(`SELECT assignment.id, assignment.assign_name AS name, assignment.assign_details AS details, assignment.assign_date AS assignedAt, CONCAT(staff.staff_fName, " ", staff.staff_lname) AS staff_name FROM tbl_assignment assignment LEFT JOIN tbl_classroom class on class.class_uuid = assignment.class_uuid LEFT JOIN tbl_staff staff on staff.staff_uuid = assignment.staff_uuid WHERE class.class_uuid = "${req.body.id}"`,{ type: db.sequelize.QueryTypes.SELECT })
    .then(results => {
        res.json(results);
     })
    .catch( err => {
        res.send(err)
    });
})

// GET Route to retrieve a single classroom <findOne>
classrooms.get("/:id", middleware.checkToken, (req, res) => {
    Classroom.findOne({
        where: {
            ins_uuid: req.decoded.id,
            class_uuid: req.params.id
        },
        attributes: ['classID', 'name', 'createdAt', 'img'],
        include: [ 
            {
                model: Student ,
                // where: {
                //     ins_uuid: req.decoded.id
                // },
                attributes: ['studID','fname', 'lname', 'img'],
                through: { attributes: [] }              
            },
            {
                model: Staff,
                // where: {
                //     ins_uuid: req.decoded.id
                // },
                attributes: ['staffID', 'fname', 'lname', 'img'],
                through: { attributes: []}
            }

        ]
    })
    .then(classroom => {
        res.status(200).json({status: "Ok", classroom})
    })
    .catch(err => {
        res.send(err);
    })
})

// PUT Route <update>
classrooms.put('/:id', middleware.checkToken, (req, res) => {
    var classData = {
        name: req.body.name
    }

    Classroom.update(ClassData, {
        where: {
            classData: req.params.id
        }
    })
    .then(classroom => {
        res.status(200).json({classroom})
    })
    .catch(err => {
        res.send(err);
    })
})

// DELETE Route <drop>
classrooms.delete('/:id', middleware.checkToken, (req, res) => {
    Classroom.destroy({
        where: {
            class_uuid : req.params.id, 
            ins_uuid: req.decoded.id
        }
    })
    .then(classroom => {
        res.status(200).json({status: "Ok"})
    })
    .catch(err => {
        res.send(err);
    })
})

// GET Route for student
classrooms.get('/student', middleware.checkToken, (req, res) => {
    Classroom.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
       attributes: {exclude: ['id','ins_uuid','createdAt']},
        include: [ 
            {
                model: Student ,
                where: {
                    ins_uuid: req.decoded.id
                },
                attributes: ['studID','fname', 'lname', 'username', 'img'],
                through: { attributes: [] }              
            } 
        ],
        
    }).then(classroom => {
        res.status(200).json({status: "OK", classroom})
    })
    .catch( err => {
        res.send(err)
    });
})

// DELETE Student
classrooms.delete('/:id/student/', middleware.checkToken, (req, res) =>{
    ClassStud.destroy({
        where: {
            classID: req.params.id,
            studID: req.body.uuid
        }        
    }).then(classroom => {
        res.status(200).json({status: "OK"})
    }).catch(err => {
        console.log(err);
    })
})

// ADD Student
classrooms.post('/:id/student/', middleware.checkToken, (req, res)=>{
    const classstudData = {
        classID: req.params.id,
        studID:req.body.uuid 
    }
    ClassStud.create(classstudData)
    .then(classroom => {
        res.status(200).json({status: "OK"})
    }).catch(err => {
        console.log(err);
    })
})

// DELETE Staff
classrooms.delete('/:id/staff/', middleware.checkToken, (req, res) =>{
    ClassStaff.destroy({
        where: {
            classID: req.params.id,
            staffID: req.body.uuid
        }
        
    }).then(classroom => {
        res.status(200).json({status: "OK"})
    }).catch(err => {
        console.log(err);
    })
})

// ADD Staff
classrooms.post('/:id/staff/', middleware.checkToken, (req, res)=>{
    const classstaffData = {
        classID: req.params.id,
        staffID:req.body.uuid 
    }
    ClassStaff.create(classstaffData).then(classroom => {
        res.status(200).json({status: "OK"})
    }).catch(err => {
        console.log(err);
    })
})

// filter function to filter the students
// raw sql query except function
// GET - show all student except in the classroom
classrooms.get('/:id/student', middleware.checkToken, (req, res) => {
    db.sequelize.query(`SELECT stud_uuid AS uuid, CONCAT(tbl_student.stud_fname, " ", tbl_student.stud_lname) AS name, stud_img AS img FROM tbl_student WHERE stud_uuid  NOT IN (SELECT stud_uuid FROM tbl_class_std WHERE tbl_class_std.class_uuid="${req.params.id}")`, { type: db.sequelize.QueryTypes.SELECT }) 
    .then(results => {
        res.json(results);
     })
    .catch( err => {
        res.send(err)
    });
})

// filter function to filter the staffs
// raw sql query except function
// GET - show all staffs except in the classroom
classrooms.get('/:id/staff', middleware.checkToken, (req, res) => {
    db.sequelize.query(`SELECT staff_uuid AS uuid, CONCAT(tbl_staff.staff_fname, " ", tbl_staff.staff_lname) AS name, staff_img AS img FROM tbl_staff WHERE staff_uuid  NOT IN (SELECT staff_uuid FROM tbl_class_staff WHERE tbl_class_staff.class_uuid="${req.params.id}")`, { type: db.sequelize.QueryTypes.SELECT }) 
    .then(results => {
        res.json(results);
     })
    .catch( err => {
        res.send(err)
    });
})

// GET Route for staff
classrooms.get('/staff',middleware.checkToken, (req, res) =>{
    
    Classroom.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
        attributes: {
            exclude: ['id', 'ins_uuid', 'createdAt'] 
        },
        include: [
            {
                model: Staff,
                where: {
                    ins_uuid: req.decoded.id
                },
                attributes: ['staffID', 'fname', 'lname', 'img'],
                through: { attributes: []}
            }
        ]
    }).then(classroom => {
        res.status(200).json({status: "OK", classroom})
    })
    .catch( err => {
        res.send(err)
    });
})
module.exports = classrooms;