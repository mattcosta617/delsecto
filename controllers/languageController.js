const mongoose = require('mongoose');


const languageController = {
    language: {
        type: String,
    }
};

const Language = mongoose.model('LanguageController', languageController);

module.exports = Language;