var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CHECK FOR THE USER IN THE DB
// VERIFY 

router.post('/', (req, res) => {
    console.log("hello", req.body.password)
    db.User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            res.json({ status: 'User Not Found' })
        }
        // ELSE COMPARE PASSWORD
        User.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                res.json({ status: 'Password verification Failed' })
            }
            // IF VALID USER
            jwt.sign({ userID: user._id }, 'Motu')
            localStorage.setItem('jwtToken', token);
            res.json({ 'token': token })
            User.token = token;
            User.save(function (err, user) {
                if (err) return cb(err);
                cb(null, user)
            })

        })
    })
});

module.exports = router;