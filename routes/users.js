var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// route -> /user/signup
// perform a check of whether the user already exists
// save the user credentials in the DB
// generate a token based on the User ID -> db.User._id

router.post('/signup', (req, res) => {
  db.User.findOne({email: req.body.email})
  .then((user) => {
    if (user) {
      res.json({email: "email already exists"})
    } else {
      const newUser = new db.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('password', salt, (err, hash) => {
          if(err) throw err;
          else {
            newUser.password = hash
            newUser.save((err, user) => {
              if(err) console.log(err)
              else {
                // Create a JWT Token
                jwt.sign({_userID: user.id}, 'hello', function(err, token) {
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
