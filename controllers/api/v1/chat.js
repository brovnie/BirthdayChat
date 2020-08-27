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
        // find users born the same date
        User.find({ dateofbirth: birthdate , "account.id" : { $ne: userId }  }, function (err, foundedUsers) {
            if (err) {
                res.send(err);
            }
            //count users
            let countedUsers = foundedUsers.length;
            let userData = { 
                username:currentUser.account.username,
                firstname: currentUser.firstname, 
                lastname: currentUser.lastname, 
                country: currentUser.country }
                
            res.render('chat', { nUsers: countedUsers, users: foundedUser,  currentUser: userData });
        });
    });
};


module.exports.birthdayPage = birthdayPage;