// Sign up Routes

let express = require('express');
let router = express.Router();

/*GET Register Page*/
router.get('/', (req, res) => {
    res.render('register/register');
  });
/* POST Save email and password  */
router.post('/', (req,res) => {
    res.redirect("/register/details");
});
/* GET details page */
router.get('/details', (req, res) => {
    res.render('register/details');
    
});

module.exports = router;