const mongoose = require('mongoose');


const languageController = {
    language: {
        type: String,
    }
};

const Language = mongoose.model('Language', languageController);

module.exports = Language;