var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport')
// const verifyToken = require('../config/Auth_Middleware')
// passport.use(JwtStrategy);

/* GET users listing. */
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'Motu', (err, authData) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        message: 'respond with a resource',
        authData
      });
    }
  })
});



// Verify Token function

// Format of the Token
// Authorization: Bearer {token}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  // Checking token
  // check to see that is not undefined 
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // get token from the second index of the array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  } else {
    res.json({ error: 'Invalid Token' })
  }
}

module.exports = router;