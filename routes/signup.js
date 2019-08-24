var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// route -> /user/signup
// perform a check of whether the user already exists
// save the user credentials in the DB
// generate a token based on the User ID -> db.User._id

router.post('/', (req, res) => {
  db.User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.json({ Satus: "User already exists" })
      } else {
        const User = new db.User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        // SAVING THE DATA IN DB ******************
        User.save((err, doc) => {
          if (err) throw err;
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(User.password, salt, function (err, hash) {
              User.password = hash;
            })
          })
          res.json({ 'status': 'Data saved successfully' })
        })
      }
    })
})

module.exports = router;