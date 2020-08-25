let User = require("../../../modules/user");
const http = require('http'),
      Primus = require('primus'),
      server = http.createServer(),
      options = {transformer: 'websockets'},
      primus = new Primus(server, options);

const birthdayPage = (req, res) => {
    let userId = req.user._id;
    //find info about current user
    User.findOne({ "account.id": userId }, (err, foundedUser) => {
        if (err) {
            res.sendr(err);
        }
        let birthdate = foundedUser.dateofbirth;
        // find users born the same date
        User.find({ dateofbirth: birthdate , "account.id" : { $ne: userId }  }, function (err, foundedUsers) {
            if (err) {
                res.send(err);
            }
            //count users
            let countedUsers = foundedUsers.length;
          primus.on("connection", function (spark) {
    spark.write("Hello, world!")
})
            
            res.render('profile', { nUsers: countedUsers, users: foundedUser });
        });
    });
};


module.exports.birthdayPage = birthdayPage;