// Mongoose Schema - used for chat
//
//
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const MessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

MessageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Message", MessageSchema);
