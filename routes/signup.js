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
        res.json({ email: "email already exists" })
      } else {
        const newUser = new db.User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        // ENCRYPTING PASSWORDS USING BCRYPTJS ***********************.............................
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash('password', salt, (err, hash) => {
            if (err) throw err;
            else {
              // SAVING THE DATA IN DB ******************
              newUser.password = hash
              newUser.save((err, user) => {
                if (err) console.log(err)
                else {
                  // Create a JWT Token -> jwt.sign is the method that is used to create a JSON web token..................
                  jwt.sign({ userID: user.id }, 'motu', function (err, token) {
                    if (err) throw err;
                    res.json(token);
                  })
                }
              })
            }
          })
        })
      }
    })
})

module.exports = router;