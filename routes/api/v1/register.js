// ========= Sign up Routes
// 
//
//

let express = require('express');
let router = express.Router();
let passport = require("passport");
let Account = require("../../../modules/account");
//let User = require("../../../modules/user");

/*GET Register Page*/
router.get('/', (req, res) => {
  res.render('register');
});

/* POST Save email and password  */
router.post('/', (req, res) => {
  //save user
  let newUser = new Account({ username: req.body.username });

  Account.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    }
    console.log(user.username);
    passport.authenticate("local")(req, res, () => {
      res.send("passport works");
    });


  }); // end Access register

});

module.exports = router;



/*
    //middleware - check password
    /*if(req.body.password1 == req.body.password2){
      let password = req.body.password1;
    } else {
      res.send("not");
    }

// save extra data
 /*   let userDetails = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
       datofbirth: req.body.dateofbirth
    };
    */
      //format date 
/*let dateBefore = req.body.dateofbirth.split("-").reverse();
let dateAfter = dateBefore[0] + "-" + dateBefore[1] + "-" + dateBefore[2];
*/


