const mongoose = require('mongoose');


const questionsController = new mongoose.Schema({
    question: {
        type: String,
    }, languageId: {
        type: String,
    }, languages: {
        HTML: {
            type: String,
        },
        CSS: {
            type: String,
        },
        Javascript: {
            type: String,
        },
        Python: {
            type: String,
        },
        Express: {
            type: String,
        },
        MongoDB: {
            type: String,
        },
    }, solution: {
        type: String,
    }, code: {
        type: String,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', questionsController);

module.exports = Question;