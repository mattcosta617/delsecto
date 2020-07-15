const mongoose = require('mongoose');


const questionsController = new mongoose.Schema({
        question: {
            type: String,
    }, languageId: {
            type: String,
    }, solutions: {
            type: String,
    }, code: {
             type: String,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', questionsController);

module.exports = Question;