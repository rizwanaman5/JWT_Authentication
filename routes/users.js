var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;