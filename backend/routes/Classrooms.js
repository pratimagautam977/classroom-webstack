const express = require("express");
let classrooms = express.Router();
const cors = require("cors");
const Classroom = require("../models/classroom");
const uuidv4 = require('uuid/v4');
classrooms.use(cors());

// ########  MIDDLEWARE   ########
const midddleware = require('../config/Middleware');    //Added Middleware
// ###############################

// POST Route 
classrooms.post("/", midddleware.checkToken, (req, res) => {
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
classrooms.get("/", midddleware.checkToken, (req, res) => {
    Classroom.findAll({
        where: {
            ins_uuid: req.decoded.id
        },
        attributes: ['ID', 'name', 'createdAt']
    })
    .then(classroom => {
        res.status(200).json({status: "OK", classroom})
    })
    .catch(err => {
        res.send(err);
    })
})

// GET Route to retrieve a single classroom <findOne>
classrooms.get("/:id", midddleware.checkToken, (req, res) => {
    Classroom.findOne({
        where: {
            ins_uuid: req.decoded.id,
            class_uuid: req.params.id
        },
        attributes: ['ID', 'name', 'createdAt']
    })
    .then(classroom => {
        res.status(200).json({status: "Ok", classroom})
    })
    .catch(err => {
        res.send(err);
    })
})

// PUT Route <update>
classrooms.put('/:id', (req, res) => {
    //for now lets skip update and start with delete 
})

// DELETE Route <drop>
classrooms.delete('/:id', midddleware.checkToken, (req, res) => {
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

module.exports = classrooms;