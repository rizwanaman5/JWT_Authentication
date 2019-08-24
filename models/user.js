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
// userSchema.pre('save', function (next) {
//     // Only Hash password if it has been changed, or is new
//     if (User.isModified) {

//         // Bcrypt JS
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) return next(err)

//             bcrypt.hash(User.password, salt, function (err, hash) {
//                 User.password = hash;
//                 next();
//             })
//         })
//     } else {
//         next();
//     }
// })

// PASSWORD VERIFICATION -> DURING SIGN IN **********************
userSchema.methods.comparePassword = function (userPassword, cb) {
    bcrypt.compare(userPassword, User.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema)
module.exports = User;