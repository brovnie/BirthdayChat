let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User page*/
router.get("/birthday/:date", (req, res) => {
  res.render('profile');
})


/*GET Login Page*/
router.get('/login', (req, res) => {
  res.render('login');
});
/*POST Log in */


/*GET Log out */


module.exports = router;