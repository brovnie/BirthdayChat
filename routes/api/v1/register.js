// ========= Sign up Routes
// 
//
//

let express = require('express');
let router =  express.Router();
let passport = require("passport");
let User = require("../../../modules/access");
let UserPrivate = require("../../../modules/user");

/*GET Register Page*/
router.get('/', (req, res) => {
    res.render('register');
  });

/* POST Save email and password  */
router.post('/', (req,res,next) => {

    //middleware - check password
    if(req.body.password1 == req.body.password2){
      let password = req.body.password1;
    } else {
      res.send("not");
    }
    let password = req.body.password1;


// save date
let email = req.body.email;
    let userDetails = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
       datofbirth: req.body.dateofbirth
    };
    

      //format date 
let dateBefore = req.body.dateofbirth.split("-").reverse();
let dateAfter = dateBefore[0] + "-" + dateBefore[1] + "-" + dateBefore[2];


//save user
    let newUser = User({username: email});

    User.register(newUser, req.body.password1 , (err, user) => {
      if(err){
        res.send(err);
      }

      passport.authenticate("local")(req,res, () => {

        res.redirect("/register");
    });
  });

});

module.exports = router;