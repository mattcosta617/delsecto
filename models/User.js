const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
    }
}, {timestamp: true});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);