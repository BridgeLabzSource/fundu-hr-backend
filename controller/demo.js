/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    q = require('q'),
    db = require('../database/db'),
    sms = require('../model/sms');
/**
 * demo
 */
router.get('/', function(req, res) {
    res.send('hiiiii');
});
/**
 * sendmsg
 * @param {message}
 * @return {json}
 */
router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    console.log(message);
    res.json({ message: message });
});
/**
 * save spreadsheet data into mongodb
 * @param {share}
 * @return {json}
 */
router.post('/edit', function(req, res) {
    var d = req.body.share;
    sms.save(d, function(err, data) {
        if (err) {
            res.json({ "error": err, "status": false });
        } else {
            res.json({ "data": data, "status": true });
        }
    })
});
/**
 * send otp to mobile
 * @param {mobile}
 * @return {otp}
 */
router.post('/otp', function(req, res) {
    var mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.json({ "error": err, "status": false });
        } else {
            res.json({ "data": data, "status": true });
        }
    })
});
/**
 * verify mobile and otp
 * @param {mobile,otp}
 * @return {json}
 */
router.post('/verify', function(req, res) {
        var data = {
            mobile: req.body.mobile,
            otp: req.body.otp
        }
        sms.verify(data, function(err, data) {
            if (err) {
                res.json({ "error": err, "status": false });
            } else {
                res.json({ "data": data, "status": true });
            }
        })
    })
    /**
     * call wit.ai
     * @param {message,mobile}
     * @return {response}
     */
router.post('/wit', function(req, res) {
    var data = {
        message: req.body.message,
        mobile: req.body.mobile
    }
    sms.wit(data, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});
module.exports = router;
