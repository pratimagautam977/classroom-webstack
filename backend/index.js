// express, cors, body-parser, jwt, mysql, bcrypt, @hapi/joi, sequelize, nodemon,
const express = require('express');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const socketio = require("socket.io");
const http = require("http")

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
      
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const demo = require("./mail");

app.use(cors());

app.use(express.static(__dirname + '/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// making route for institute
var Institutes = require("./routes/Institutes");
app.use("/institute", Institutes);

// making route for staff
var Staffs = require("./routes/Staffs");
app.use("/staff", Staffs);

// making route for student
var Students = require("./routes/Students");
app.use("/student", Students);

// making route for classroom
var Classrooms = require("./routes/Classrooms");
app.use("/classroom", Classrooms);

// making route for payment
var Payments = require("./routes/Payment");
app.use("/pay", Payments);

io.on("connection", (socket) => { 
    console.log('We have a new connection!!!');
  
    socket.on("join", ({ name, room }, callback) => {
      console.log(name, room);
  
      // const error = true;
  
      // if(error){
      //     callback({ error: 'error'});
      // }
  
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if (error) return callback(error);
      
      socket.join(user.room);
  
      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to the room ${user.room}`,
      });
  
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name}, has joined!` });
  
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
  
      callback();
    });
  
    //this seems an issue
    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      console.log(user)
  
      io.to(user.room).emit("message", { user: user.name, text: message });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
  
      callback();
    });
  
    socket.on("disconnect", () => {
        console.log("User Had left"); 
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });


app.get('/test',(req,res)=>{
    demo(req,res);
})


// TEST DATA
// app.get('/test',(req,res)=>{
//     res.status(200).json({status: "okay"})
// })
// END OF TEST DATA

server.listen(3000, console.log('Server started at port 3000'));
