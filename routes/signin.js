var express = require('express');
var router = express.Router();
const db = require('../models');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CHECK FOR THE USER IN THE DB
// VERIFY 

router.post('/', (req, res) => {
    console.log("hello", req.body)

    let email = req.body.email;
    let password = req.body.password;

    db.User.findOne({ email: email })
        .then((user) => {
            // COMPARE PASSWORD
            console.log(user.email, email)
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({ status: 'Password verification Failed' })
                }
                // IF VALID USER
                jwt.sign({ userID: user._id }, 'Motu', function (err, token) {
                    // localStorage.setItem('jwtToken', token);
                    res.json({ token: token })
                    console.log(token);

                    user.token = token;
                    user.save(function (err, user) {
                        if (err) throw err;
                        console.log(user)
                    })
                })
            })
        }).catch((err) => {
            // res.send(err);
            res.json({ status: 'User Not Found' })
        })
});

module.exports = router;

