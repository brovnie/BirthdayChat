// ========= Sign up Routes
// 
//
//

let express = require('express');
let router = express.Router();
let passport = require("passport");
let User = require("../../../modules/user");

/*GET Register Page*/
router.get('/', (req, res) => {
    res.render('register');
  });
/* POST Save email and password  */
router.post('/', (req,res) => {
    // dummie data
    let email = "abc1@test.com";
    let fakePassword = "password";
    let userDetails = {
      firstname: "Test First name",
      lastname: "test last name",
       datofbirth: "00-00-0000"
    };

    let newUser = User({username: email, userDetails: userDetails});

    User.register(newUser, fakePassword, (err, user) => {
      if(err){
          res.render("register");
          console.log(err);
      }
      passport.authenticate("local")(req,res, () => {
          res.send("success new user is " + user.userDetails.firstname);
          
      });
  });

});

module.exports = router;