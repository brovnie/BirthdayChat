let express = require('express');
let router = express.Router();
let User = require('../modules/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User page*/
router.get("/birthday/:date", (req, res) => {
  console.log(res.locals.currentUser.username);
  console.log(req.user);
  //User.find();
  res.render('profile');
});

module.exports = router;