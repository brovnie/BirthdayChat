//Register 
let passport = require("passport");
let Account = require("../modules/account");
let User = require("../modules/user");

const signup = (req, res) => {
    let newUser = new Account({ username: req.body.username });

    Account.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.send(err);
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/register/user-details");
        });
    }); 
};

const userDetails = (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let country = req.body.country;
    let city = req.body.city;
    let birthdate = req.body.birthdate;
    let account = {
      id: res.locals.currentUser._id,
      username: res.locals.currentUser.username
    };
    let newUser = { firstname: firstname, lastname: lastname, dateofbirth: birthdate, country: country, city: city, account: account }

    User.create(newUser, (err, user) => {
      if (err) {
       return res.send(err);
      }

      let dateBefore = birthdate.split("-").reverse();
      let dateAfter = dateBefore[0] + "-" + dateBefore[1] + "-" + dateBefore[2];
  
      res.redirect("/birthday/" + dateAfter);
    });
  }

  module.exports.signup = signup;
  module.exports.userDetails = userDetails;