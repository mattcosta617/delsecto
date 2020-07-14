const mongoose = require('mongoose');


const languageController = new mongoose.Schema({
        languages: {
            HTML: [{
                type: String,
            }],
             CSS: [{
                type: String,
             }],
             Javascript: [{
                type: String,
             }],
             Python: [{
                type: String,
             }],
            Express: [{
                type: String,
            }],
            MongoDB: [{
                type: String,
}] }});

const Language = mongoose.model('Language', languageController);

module.exports = Language;