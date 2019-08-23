var express = require('express');
var router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CHECK FOR THE USER IN THE DB
// VERIFY 

router.post('/', (req, res) => {
    console.log("hello", req.body.email)
    db.User.findOne({ email: req.body.email })
        .then((user) => {
            console.log(user)
            id = user._id;
            hash = user.password;
            bcrypt.compare(req.body.password, hash).then((res) => {
                // res === true
                console.log('****************',res)
                    jwt.sign({ userID: id }, 'motu', function (err, token) {
                        if (err) throw err;
                        res.json(token);
            });
            // bcrypt.compare(req.body.password, hash, function (err, response) {
            //     if (response) {
            //         console.log('****************',response)
            //         jwt.sign({ userID: id }, 'motu', function (err, token) {
            //             if (err) throw err;
            //             res.json(token);
            //         })
            //     }
            //     // if (response) {
            //     //     console.log(response)
            //     //     // Create JWT Token
            //     //     jwt.sign({ _userID: response.id }, 'motu', function (err, token) {
            //     //         if (err) throw err;
            //     //         res.json(token);
            //     //     })
            //     //     // res.json({login: 'success'})
            //     // }
            })
        })
})

module.exports = router;