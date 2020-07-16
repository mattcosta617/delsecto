const mongoose = require('mongoose');
const Question = require('./Question');


const languageController = new mongoose.Schema({
        languages: {
                type: String,
             }, language: {
                type: String,
        }, solutions: {
                type: String,
        },
        code: {
                 type: String,
        }, questions: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
        }],
    });

const Language = mongoose.model('Language', languageController);

module.exports = Language;