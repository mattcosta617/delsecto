const mongoose = require('mongoose');
const Solution = require('./Solution');
const Language = require('./Language');



const questionsController = new mongoose.Schema({
        question: {
            type: String,
    }, languageId: {
            type: String,
    }, solutions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solution"
    }], languages: [{
        type: mongoose.Schema.Types.ObjectId,
            ref: "Language"
    }], code: {
             type: String,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', questionsController);

module.exports = Question;