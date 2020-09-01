let User = require("../../../modules/user");

const birthdayPage = (req, res) => {
    let userId = req.user._id;
    //find info about current user
    User.findOne({ "account.id": userId }, (err, foundedUser) => {
        if (err) {
            res.sendr(err);
        }
        let currentUser = foundedUser;
        let birthdate = foundedUser.dateofbirth;
        let newDate = findBirthdate(birthdate);
        // find users born the same date
        User.find({ dateofbirth: birthdate , "account.id" : { $ne: userId }  }, function (err, foundedUsers) {
            if (err) {
                res.send(err);
            }
            //count users
            let countedUsers = foundedUsers.length;
            let userData = { 
                username:currentUser.account.username,
                birthdate: newDate,
                firstname: currentUser.firstname, 
                lastname: currentUser.lastname, 
                country: currentUser.country }
             
            res.render('chat', { nUsers: countedUsers, users: foundedUser,  currentUser: userData });
        });
    });
};

   
let findBirthdate = (date) => {
    let dateBefore = date.split("-").reverse();
    let dateAfter = dateBefore[0] + "-" + dateBefore[1] + "-" + dateBefore[2];
    return dateAfter;
  };
module.exports.birthdayPage = birthdayPage;