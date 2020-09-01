let express = require('express');
let router = express.Router();
let passport = require("passport");
const userController = require('../../../controllers/auth');
const isLoggedIn = require('../../../middleware/index');
// ==== REGISTER
/* GET Register Page*/
router.get('/register', (req, res) => {
  res.render('registration/register');
});

/* POST Save email and password  */
router.post('/register', userController.signup);

/* GET Register - user details */
router.get('/register/user-details', isLoggedIn, (req, res) => {
  res.render('registration/user-details');
});
/* POST Register- user details */
router.post('/register/user-details', userController.userDetails);

// ==== LOGIN
/* GET Login page */
router.get("/login", (req, res) => {
    res.render("login");
});
/* POST Log user in */
router.post('/login',
  passport.authenticate('local'), userController.login
 );


//===== LOGOUT
router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;