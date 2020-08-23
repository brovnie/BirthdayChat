let express = require('express');
let router = express.Router();
let passport = require("passport");
const userController = require('../../../controllers/auth');

/* GET Register Page*/
router.get('/register', (req, res) => {
  res.render('registration/register');
});

/* POST Save email and password  */
router.post('/register', userController.signup);

/* GET Register - user details */
router.get('/register/user-details', (req, res) => {
  res.render('registration/user-details');
});
/* POST Register- user details */
router.post('/register/user-details', userController.userDetails);

// ==== LOGIN
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
{ successRedirect: "/login",
    failureRedirect: "/register"
 }), (req, res) =>{
});

//===== LOGOUT
router.get("/logout", (req, res) => {
    req.logout();
    console.log("success")
    res.redirect("/register");
});

module.exports = router;