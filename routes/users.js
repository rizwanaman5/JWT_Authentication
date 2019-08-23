var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const JwtStrategy = require('../config/passport')
passport.use(JwtStrategy);

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
  res.send('respond with a resource');
});

module.exports = router;