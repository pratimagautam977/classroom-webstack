const express = require("express");
let staffs = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const Institute = require("../models/institute");
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');
const sendMail = require("../mail");
const Filemanager = require("../models/filemanager");
const Calendar = require("../models/calendar");

staffs.use(cors());

const db = require('../config/config');

// ########  MIDDLEWARE   ########
const middleware = require('../config/Middleware');    //Added Middleware
// ###############################

var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.bucket;


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

// File Upload to S3
// Now lets export this function so we can call it from somewhere else
staffs.post("/upload", middleware.checkToken, (req, res) => {
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

staffs.delete("/file/:id", middleware.checkToken, (req, res) => {
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


// GET all the classroom of the staff
staffs.get('/classroom', middleware.checkToken, (req, res) => {
    db.sequelize.query(`SELECT classroom.class_uuid AS classID, classroom.class_name AS name, classroom.class_img AS img from tbl_class_staff cf LEFT JOIN tbl_staff st on st.staff_uuid = cf.staff_uuid LEFT JOIN tbl_classroom classroom on classroom.class_uuid = cf.class_uuid where cf.staff_uuid = "${req.decoded.login}"`,{ type: db.sequelize.QueryTypes.SELECT })
    .then(results => {
        res.json(results);
     })
    .catch( err => {
        res.send(err)
    });
})

// GET ALL FILES
staffs.get("/files", middleware.checkToken, (req, res) => {
  Filemanager.findAll({
    where: {
      uploader_uuid: req.decoded.login
    },

    attributes: ["uuid", "filename", "filetype", "date_created", "url"]
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.send(err);
    });
});

//GET Route to retrieve the calendar events
staffs.get("/calendar", middleware.checkToken, (req, res) => {
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
staffs.get("/calendar/:id", middleware.checkToken, (req, res) => {
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
staffs.post("/calendar", middleware.checkToken, (req, res) => {
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

//DELETE Calendar Tasks
staffs.delete("/calendar/:id", middleware.checkToken, (req, res) => {
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
staffs.put("/calendar/:id", middleware.checkToken, (req, res) => {
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
// GET Route to retrieve a single staff <findOne>""
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
      img: "https://www.tibs.org.tw/images/default.jpg",
      password: req.body.password,
    };

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
                        const staffInfo = `
                        <p>You have been successfully added to Classroom Webstack by your institute</p>
                        <h3>Registration Details</h3>
                        <ul>
                            <li>Email: ${staffData.email}</li>
                            <li>Name: ${staffData.fname + " " + staffData.lname}</li>    
                            <li>Phone: ${staffData.phone}</li>          
                        </ul>
                        <h3>Message</h3>
                        <p>Thanks for registering with us</p>
                        `;

                        sendMail(staffInfo, staffData.email, "Successfully Confirmed");
                            
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