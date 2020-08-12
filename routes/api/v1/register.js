// ========= Sign up Routes
// 
//
//

let express = require('express');
let router = express.Router();

/*GET Register Page*/
router.get('/', (req, res) => {
    res.render('register/register');
  });
/* POST Save email and password  */
router.post('/', (req,res) => {
    res.redirect("/register/user");
});
/* GET details page */
router.get('/user', (req, res) => {
    res.render('register/details-user');
});
/*POST user details*/
router.post('/user', (req,res) => {
    res.redirect("/register/user/profile");
});

/*GET profile details*/
router.get('/user/profile', (req, res) => {
    res.render('register/details-profile');
});

/*POST profile details*/
router.post('/confirm', (req,res) => {
    res.redirect("/register/user/profile");
});
module.exports = router;