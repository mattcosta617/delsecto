const mongoose = require('mongoose');


const userController = new mongoose.Schema ({
    name: {
        type: String,
    }, questions: {
        type: String,
    }, solutions: {
        type: String,
    }
}, {timestamps: true});

const User = mongoose.model('users', userController);

module.exports = User;