// ========= Sign up Routes
// 
//
//
let express = require('express');
let router = express.Router();
let passport = require("passport");
let Account = require("../../../modules/account");
let User = require("../../../modules/user");

/*GET Register Page*/
router.get('/', (req, res) => {
  res.render('registration/register');
});

/* POST Save email and password  */
router.post('/', (req, res) => {
  //save user
  let newUser = new Account({ username: req.body.username });

  Account.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    }

    passport.authenticate("local")(req, res, () => {
      res.redirect("/register/user-details");
    });
  }); // end Access register
});

/* GET Register - user details */
router.get('/user-details', (req, res) => {
//  console.log(res.locals.currentUser);
  res.render('registration/user-details');
});

router.post('/user-details', (req,res) =>{
let  firstname = req.body.firstname;
let  lastname = req.body.lastname;
let  country = req.body.country;
let city = req.body.city;
let birthdate = req.body.birthdate;
let account = {
  id: req.user._id,
  username: res.locals.currentUser.username
};
let newUser = {firstname: firstname, lastname: lastname, dateofbirth: birthdate, country: country, city: city, account: account}

User.create(newUser, (err, user) => {
  if (err) {
    res.send(err);
  }
 // passport.authenticate("local")(req, res, () => {
    res.redirect("/birthday/" + birthdate);
 // });
});

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