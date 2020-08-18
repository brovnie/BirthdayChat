// ========= Sign up Routes
// 
//
//

let express = require('express');
let router = express.Router();

/*GET Register Page*/
router.get('/', (req, res) => {
    res.render('register');
  });
/* POST Save email and password  */
router.post('/', (req,res) => {
    res.send("yess");
});

module.exports = router;