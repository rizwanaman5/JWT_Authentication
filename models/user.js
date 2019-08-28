// RECQUIRING NPM MODULES
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

// PASSWORD HASHING MIDDLEWARE -> DURING SIGN UP ********************
userSchema.pre('save', function (next) {
    var user = this;

    // Only Hash password if it has been changed, or is new
    if (user.isModified('password')) {

        // Bcrypt JS
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                // console.log(hash)
                // console.log('from userModels', user.password)
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

// PASSWORD VERIFICATION -> DURING SIGN IN **********************
userSchema.methods.comparePassword = function (userPassword, cb) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
        console.log(this.password);
        
    })
}

const User = mongoose.model('User', userSchema)
module.exports = User;