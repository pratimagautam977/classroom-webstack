const express = require("express");
let institutes = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institute = require("../models/institute");
const Calendar = require("../models/calendar");
const Filemanager = require("../models/filemanager");
const uuidv4 = require("uuid/v4");
institutes.use(cors());
const axios = require("axios");
const sendMail = require("../mail");

// ########  MIDDLEWARE   ########
const middleware = require("../config/Middleware"); //Added Middleware
// ###############################

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.bucket;

// Register Institute
institutes.post("/register", (req, res) => {
  const instituteData = {
    insID: "",
    email: req.body.email,
    phone: req.body.phone,
    uname: req.body.uname,
    password: req.body.password,
  };

  Institute.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { uname: req.body.uname }],
      //SELECT * FROM post WHERE email = req.body.email OR uname = req.body.uname;
    },
  })
    .then((institute) => {
      if (!institute) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          instituteData.password = hash;
          instituteData.insID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
          Institute.create(instituteData)
            .then((institute) => {
              const instituteInfo = `
              <p>You have successfully registered to the Classroom Webstack</p>
              <h3>Registration Details</h3>
              <ul>
                  <li>Email: ${instituteData.email}</li>
                  <li>Institute ID: ${instituteData.uname}</li>    
                  <li>Phone: ${instituteData.phone}</li>          
              </ul>
              <h3>Message</h3>
              <p>Thanks for registering with us</p>
              `;

              // sendMail(instituteInfo, institute.email, "Successfully Confirmed");

              res.json({ status: institute.email + " Registered." });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.json({ error: "Institute already exists" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// Login Institute
institutes.post("/login", (req, res) => {
  Institute.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((institute) => {
      if (institute) {
        if (bcrypt.compareSync(req.body.password, institute.password)) {
          let token = jwt.sign(
            {
              id: institute.insID,
              isAdmin: true,
              isStaff: false,
              isStudent: false,
            },
            process.env.APP_SECRET,
            {
              expiresIn: 86400,
            }
          );
          res.send({ token });
        } else {
          res.status(403).json({ error: "Wrong Credentials" });
        }
      } else {
        res.status(400).json({ error: "Institute does not exists" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});
// UPDATE Institute Route
institutes.put("/", middleware.checkToken, (req, res) => {
  switch (req.body.type) {
    case "upload":
      const s3 = new aws.S3(); // Create a new instance of S3
      const fileName = req.body.fileName;
      const fileType = req.body.fileType;

      const fileUUID = uuidv4();
      // Set up the payload of what we are sending to the S3 api
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: `institute/${req.decoded.id}/${fileUUID}` + "." + fileType,
        Expires: 50,
        ContentType: fileType,
        ACL: "public-read",
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
          url: `https://${S3_BUCKET}.s3.amazonaws.com/institute/${req.decoded.id}/${fileUUID}.${fileType}`,
        };

        var NewData = {
          logo: `https://${S3_BUCKET}.s3.amazonaws.com/institute/${req.decoded.id}/${fileUUID}.${fileType}`,
        };
        console.log(req.decoded.id);
        Institute.update(NewData, {
          where: {
            insID: req.decoded.id,
          },
        })
          .then((update) => {
            res.status(200).json({ success: true, data: { returnData } });
          })
          .catch((err) => {
            res.send(err);
          });
      });
      break;
    case "name":
      var NewData = {
        name: req.body.name,
      };
      console.log(req.decoded.id);
      Institute.update(NewData, {
        where: {
          insID: req.decoded.id,
        },
      })
        .then((update) => {
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          res.send(err);
        });
      break;
    case "email":
      var NewData = {
        email: req.body.email,
      };
      console.log(req.decoded.id);
      Institute.update(NewData, {
        where: {
          insID: req.decoded.id,
        },
      })
        .then((update) => {
          res.status(200).json({ success: true, data: { returnData } });
        })
        .catch((err) => {
          res.send(err);
        });
      break;
    case "password":
      if (req.body.password.length < 6) {
        res.status(401)
      }
      console.log(req.decoded.id);
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        var NewData = {
        password: hash,
      };
        Institute.update(NewData, {
          where: {
            insID: req.decoded.id,
          },
        })
          .then((update) => {
            res.status(200).json({ success: true, data: { returnData } });
          })
          .catch((err) => {
            res.send(err);
          });
      })
      break;
    default:
      res.status(401);
  }
});

institutes.get("/meta", middleware.checkToken, (req, res) => {
  Institute.findOne({
    where: { insID: req.decoded.id },
    attributes: ["logo","email", "name"],
  }).then(resp => {
    res.status(200).json(resp)
  }).then(err => {
    res.status(401);
  });
});
//GET Route to retrieve the calendar events
institutes.get("/calendar", middleware.checkToken, (req, res) => {
  Calendar.findAll({
    where: {
      uuid: req.decoded.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

//GET Route to retrieve the calendar events
institutes.get("/calendar/:id", middleware.checkToken, (req, res) => {
  Calendar.findOne({
    where: {
      uuid: req.decoded.id,
      id: req.params.id,
    },
    attributes: ["id", "title", "start", "end"],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// CREATE Route Add Calendar Tasks <create>
institutes.post("/calendar", middleware.checkToken, (req, res) => {
  const calendarData = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    uuid: req.decoded.id,
  };

  Calendar.create(calendarData)
    .then((calendar) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.send(err);
    });
});

//DELETE Calendar Tasks
institutes.delete("/calendar/:id", middleware.checkToken, (req, res) => {
  Calendar.destroy({
    where: {
      uuid: req.decoded.id,
      id: req.params.id,
    },
  })
    .then((calendar) => {
      res.status(200).json({ status: "OK" });
    })
    .catch((err) => {
      res.send(err);
    });
});

// UPDATE Calendar Route
institutes.put("/calendar/:id", middleware.checkToken, (req, res) => {
  var CalendarData = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  };
  Calendar.update(CalendarData, {
    where: {
      id: req.params.id,
    },
  })
    .then((calendar) => {
      res.status(200).json({ calendar });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Payment Route
institutes.post("/payment", (req, res) => {
  let data = {
    token: req.body.token,
    amount: req.body.amount,
  };

  let config = {
    headers: {
      Authorization: "Key live_secret_key_70d7cc81b96245488185350a3ccf7768",
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.response.data);
    });
});

// File Upload to S3
// Now lets export this function so we can call it from somewhere else
institutes.post("/upload", middleware.checkToken, (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const fileUUID = uuidv4();
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `upload/${req.decoded.id}/` + fileUUID + "." + fileType,
    Expires: 50,
    ContentType: fileType,
    ACL: "public-read",
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
      url: `https://${S3_BUCKET}.s3.amazonaws.com/upload/${req.decoded.id}/${fileUUID}.${fileType}`,
    };

    var FileData = {
      filename: fileName,
      filetype: fileType,
      uuid: fileUUID,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/upload/${req.decoded.id}/${fileUUID}.${fileType}`,
      uploader_uuid: req.decoded.id,
    };
    Filemanager.create(FileData)
      .then((file) => {
        res.status(200).json({ success: true, data: { returnData } });
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

institutes.delete("/file/:id", middleware.checkToken, (req, res) => {
  Filemanager.findOne({
    where: {
      uuid: req.params.id,
    },
  }).then((result) => {
    // res.status(200).json(result.uuid + "." + result.filetype);
    var s3 = new aws.S3();
    var params = {
      Bucket: S3_BUCKET,
      Key: `upload/${req.decoded.id}/` + result.uuid + "." + result.filetype,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // error
      else {
        Filemanager.destroy({
          where: {
            uuid: result.uuid,
          },
        })
          .then((data) => {
            res.status(200).json({ status: "OK" });
          })
          .catch((err) => {
            res.send(err);
          });
      } // deleted
    });
  });
});

// GET ALL FILES
institutes.get("/files", middleware.checkToken, (req, res) => {
  Filemanager.findAll({
    where: {
      uploader_uuid: req.decoded.id,
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



module.exports = institutes;
