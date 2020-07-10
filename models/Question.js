const mongoose = require('mongoose');


const questionsController = {
    question: {
        type: String,
    }, solution: {
        type: String,
    }, body: {
        type: String,
    },
};

const Question = mongoose.model('Question', questionsController);

module.exports = Question;