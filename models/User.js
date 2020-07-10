const mongoose = require('mongoose');


const userController = {
    name: {
        type: String,
    }, questions: {
        type: String,
    }, solutions: {
        type: String,
    }
};

const User = mongoose.model('User', userController);

module.exports = User;