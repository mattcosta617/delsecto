const mongoose = require('mongoose');


const languageController = new mongoose.Schema({
    language: {
        type: String,
    }
}, {timestamps: true});

const Language = mongoose.model('Language', languageController);

module.exports = Language;