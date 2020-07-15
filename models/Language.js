const mongoose = require('mongoose');


const languageController = new mongoose.Schema({
        languages: {
                type: String,
             }, language: {
                type: String,
        }, solutions: {
                type: String,
        }, code: {
                 type: String,
        },
    });

const Language = mongoose.model('Language', languageController);

module.exports = Language;