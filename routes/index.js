let express = require('express');
let router = express.Router();
let User = require('../modules/user');
let birthdayChatController = require('../controllers/api/v1/chat');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User page*/
router.get("/birthday/:date", birthdayChatController.birthdayPage);

module.exports = router;