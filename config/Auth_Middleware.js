var express = require('express');
const jwt = require('jsonwebtoken');

// Verify Token function

// Format of the Token
// Authorization: Bearer {token}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // Checking token
    // check to see that is not undefined 
    console.log("i reached verify token");
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // get token from the second index of the array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        jwt.verify(req.token, 'Motu', (err, authData) => {
            if (err) {
                res.json({ error: err, msg: "Invalid token" });
            } else {
                console.log("i reached else");

                next()
            }
        })

    } else {
        res.json({ error: 'There is no token' })
    }
}



module.exports = verifyToken;