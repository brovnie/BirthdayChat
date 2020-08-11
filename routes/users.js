let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*GET Login Page*/
router.get('/login', (req, res) => {
  res.render('login.ejs');
});

/*POST Log in */
/*GET Register Page*/
/*POST Create new user  */
/*GET Log out */
module.exports = router;
