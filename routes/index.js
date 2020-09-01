let express = require('express');
let router = express.Router();
let User = require('../modules/user');
let birthdayChatController = require('../controllers/api/v1/chat');
const isLoggedIn = require('../middleware/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET User page*/
router.get("/birthday/:date", isLoggedIn, birthdayChatController.birthdayPage);

module.exports = router;