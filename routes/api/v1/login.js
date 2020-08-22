// ========= Login/Logout Routes
// 
//
//

let express = require('express');
let router = express.Router();
let passport = require("passport");
let Account = require("../../../modules/account");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", passport.authenticate("local", 
{ successRedirect: "/login",
    failureRedirect: "/register"
 }), (req, res) =>{
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/register");
});

module.exports = router;