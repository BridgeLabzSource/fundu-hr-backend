/**
 * define require module
 */
let express = require('express'),
    router = express.Router();
    
router.use('/sms',require('./smsCtrl.js'));
router.use('/message',require('./msgCtrl.js'));
router.use('/excel',require('./excelCtrl.js'));
router.use('/registration',require('./registrationCtrl.js'));
/**
 * demo
 */
router.get('/', function(req, res) {
    res.send('Home Screen');
});

module.exports = router;