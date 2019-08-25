const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jwt', {useNewUrlParser: true}, function(err) {
    if (err) throw err;
    console.log('successfully connected to mongoDB');
});

module.exports.User = require('./user');