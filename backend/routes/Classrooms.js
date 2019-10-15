const express = require("express");
let classrooms = express.Router();
const cors = require("cors");
const Classroom = require("../models/classroom");
const uuidv4 = require('uuid/v4');
classrooms.use(cors());

// POST Route 
classrooms.post("/", (req, res) => {
    const classData = {
        class_uuid: "",
        ins_uuid: "035f93a5-2f92-4cc1-9668-3103da7ce5e8",
        class_name: req.body.name
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
classrooms.get("/", (req, res) => {
    Classroom.findAll({
        where: {
            ins_uuid: "035f93a5-2f92-4cc1-9668-3103da7ce5e8"
        },
        attributes: ['class_uuid', 'class_name', 'class_created_at']
    })
    .then(classroom => {
        res.status(200).json({status: "OK", classroom})
    })
    .catch(err => {
        res.send(err);
    })

})
module.exports = classrooms;