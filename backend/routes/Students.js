const express = require("express");
let students = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const uuidv4 = require('uuid/v4');
const Filemanager = require("../models/filemanager");
students.use(cors());

const db = require('../config/config');
const Calendar = require("../models/calendar");

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

var aws = require("aws-sdk");
const notes = require("../models/broadcast");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.bucket;



// File Upload to S3
// Now lets export this function so we can call it from somewhere else
students.post("/upload", middleware.checkToken, (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const fileUUID = uuidv4();
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `upload/${req.decoded.login}/` + fileUUID + "." + fileType,
    Expires: 50,
    ContentType: fileType,
    ACL: "public-read"
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/upload/${req.decoded.login}/${fileUUID}.${fileType}`
    };

    var FileData = {
      filename: fileName,
      filetype: fileType,
      uuid: fileUUID,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/upload/${req.decoded.login}/${fileUUID}.${fileType}`,
      uploader_uuid: req.decoded.login
    };
    Filemanager.create(FileData)
      .then(file => {
        res.status(200).json({ success: true, data: { returnData } });
      })
      .catch(err => {
        res.send(err);
      });
  });
});

students.delete("/file/:id", middleware.checkToken, (req, res) => {
  Filemanager.findOne({
    where: {
      uuid: req.params.id
    }
  }).then(result => {
    // res.status(200).json(result.uuid + "." + result.filetype);
    var s3 = new aws.S3();
    var params = {
      Bucket: S3_BUCKET,
      Key:
        `upload/${req.decoded.login}/` + result.uuid + "." + result.filetype
    };
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // error
      else {
        Filemanager.destroy({
          where: {
            uuid: result.uuid
          }
        })
          .then(data => {
            res.status(200).json({ status: "OK" });
          })
          .catch(err => {
            res.send(err);
          });
      } // deleted
    });
  });
});


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
      img: "https://www.tibs.org.tw/images/default.jpg",
      username: req.body.username,
      password: req.body.password,
    };

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

// GET ALL FILES
students.get("/files", middleware.checkToken, (req, res) => {
  Filemanager.findAll({
    where: {
      uploader_uuid: req.decoded.login,
    },

    attributes: ["uuid", "filename", "filetype", "date_created", "url"],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//GET Route to retrieve the calendar events
students.get("/calendar", middleware.checkToken, (req, res) => {
  Calendar.findAll({
    where: {
      uuid: req.decoded.login
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

//GET Route to retrieve the calendar events
students.get("/calendar/:id", middleware.checkToken, (req, res) => {
  Calendar.findOne({
    where: {
      uuid: req.decoded.login,
      id: req.params.id
    },
    attributes: ["id", "title", "start", "end"]
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// CREATE Route Add Calendar Tasks <create>
students.post("/calendar", middleware.checkToken, (req, res) => {
  const calendarData = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    uuid: req.decoded.login
  };

  Calendar.create(calendarData)
    .then(calendar => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.send(err);
    });
});

// CREATE Route Add Calendar Tasks <create>
students.post("/notes", middleware.checkToken, (req, res) => {
  const NotesData = {
    notes: req.body.notes,
    uuid: req.decoded.login
  };

  notes.create(NotesData)
    .then(Notes => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.send(err);
    });
});

//Get Notes
students.get("/notes", middleware.checkToken, (req, res) => {
  notes.findOne({
      where: {
        uuid: req.decoded.login,
      },
    })
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(401).json(err);
    });
});

//DELETE Calendar Tasks
students.delete("/calendar/:id", middleware.checkToken, (req, res) => {
  Calendar.destroy({
    where: {
      uuid: req.decoded.login,
      id: req.params.id
    }
  })
    .then(calendar => {
      res.status(200).json({ status: "OK" });
    })
    .catch(err => {
      res.send(err);
    });
});

// UPDATE Calendar Route
students.put("/calendar/:id", middleware.checkToken, (req, res) => {
  var CalendarData = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  };
  Calendar.update(CalendarData, {
    where: {
      id: req.params.id
    }
  })
    .then(calendar => {
      res.status(200).json({ calendar });
    })
    .catch(err => {
      res.send(err);
    });
});

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