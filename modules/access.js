// Mongoose Schema - used for login/register
//
//
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const AccessSchema = new mongoose.Schema({
    username: String,
    password: String
});

AccessSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Access", AccessSchema);
