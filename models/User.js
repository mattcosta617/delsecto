const mongoose = require('mongoose');


const userController = new mongoose.Schema ({
    username: {
        type: String,
        unique: true
    }, password: {
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('user', userController);