/**
 * define require module
 */
var express = require('express'),
    router = express.Router();

router.use(require('./sms.js'));
router.use(require('./msg.js'));

/**
 * demo
 */
router.get('/', function(req, res) {
    db.demo.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

module.exports = router;
