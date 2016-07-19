/**
 * define require module
 */
var express = require('express'),
    router = express.Router();

router.use('/sms',require('./sms.js'));
router.use('/message',require('./msg.js'));

/**
 * demo
 */
router.get('/', function(req, res) {
    res.send("Home Screen");
});

module.exports = router;
