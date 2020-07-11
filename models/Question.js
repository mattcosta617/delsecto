const mongoose = require('mongoose');


const questionsController = new mongoose.Schema({
    question: {
        type: String,
    }, solution: {
        type: String,
    }, body: {
        type: String,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', questionsController);

module.exports = Question;