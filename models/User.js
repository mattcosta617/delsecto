const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Question = require('./Question')
const Solution = require('./Solution');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50,
    }, password: {
        type: String, 
        required: true,
        minlength: 4
    }, questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }], solutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution"
}]
}, {timestamp: true});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;