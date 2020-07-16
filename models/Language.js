const mongoose = require('mongoose');


const languageController = new mongoose.Schema({
        languages: {
                type: String,
             }, language: {
                type: String,
        }, solutions: {
                type: String,
        }, questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
          }],
        code: {
                 type: String,
        },
    });

const Language = mongoose.model('Language', languageController);

module.exports = Language;