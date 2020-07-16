const mongoose = require('mongoose');
const Solution = require('./Solution');



const questionsController = new mongoose.Schema({
        question: {
            type: String,
    }, languageId: {
            type: String,
    }, solutions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solution"
    }], code: {
             type: String,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', questionsController);

module.exports = Question;