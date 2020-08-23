// Mongoose schema - detailed information about the user
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    dateofbirth: String,
    country: String,
    city: String,
    account: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Account"
        }, 
        username: String
     }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);