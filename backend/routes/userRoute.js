const express = require('express');
const user = express.Router();
const cors = require('cors');

user.use(cors());

user.post('/', (req, res) => {
    const myfnct = {
        name: req.body.name,
        email: req.body.email
    }
    res.send(myfnct);
});

module.exports = user;