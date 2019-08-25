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
            User.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({ status: 'Password verification Failed' })
                }
                // IF VALID USER
                jwt.sign({ userID: user._id }, 'Motu', function (err, token) {
                    // localStorage.setItem('jwtToken', token);
                    res.json({ token: token })
                    User.token = token;
                    User.save(function (err, user) {
                        if (err) return cb(err);
                        cb(null, user)
                    })
                })
            })
        }).catch((err) => {
            // res.send(err);
            res.json({ status: 'User Not Found' })
        })

    // db.User.findOne({ email: req.body.email }, (err, user) => {
    //     if (!user) {
    //         res.json({ status: 'User Not Found' })
    //     }
    //     // ELSE COMPARE PASSWORD
    //     User.comparePassword(req.body.password, (err, isMatch) => {
    //         if (!isMatch) {
    //             res.json({ status: 'Password verification Failed' })
    //         }
    //         // IF VALID USER
    //         jwt.sign({ userID: user._id }, 'Motu', function (err, token) {
    //             // localStorage.setItem('jwtToken', token);
    //             res.json({ token: token })
    //             User.token = token;
    //             User.save(function (err, user) {
    //                 if (err) return cb(err);
    //                 cb(null, user)
    //             })
    //         })
    //     })
    // })
});

module.exports = router;

