/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    sms = require('../model/sms');

//TODO:Demo URL to delete
/**
 * send message 
 * @param {message}
 * @return {json}
 */
router.post('/send', function(req, res) {
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
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
        }
    })
});

/**
 * send otp to mobile
 * @param {mobile}
 * @return {otp}
 */
router.post('/otp', function(req, res) {
    console.log("opt received \n" + req);
    var mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
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
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
        }
    })
});

module.exports = router;
