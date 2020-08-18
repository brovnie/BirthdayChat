const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    userDetails: {
        firstname: String,
        lastname: String,
        datofbirth: String
    } 
});
console.log("here");
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
