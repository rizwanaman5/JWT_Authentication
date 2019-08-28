var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../config/Auth_Middleware')

router.get('/', verifyToken, (req, res) => {
  console.log("i reached get");
  res.json({
    message: 'respond with a resource',
  });
});

module.exports = router;