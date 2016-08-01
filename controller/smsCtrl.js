'use strict';
/**
 * define require module
 */
let express = require('express'),
    router = express.Router(),
    sms = require('../model/sms');

//TODO:Demo URL to delete
/**
 * send message 
 * @param {message}
 * @return {json}
 */
router.post('/send', function(req, res) {
    let message = req.body.message;
    res.json({ message: message });
});

/**
 * send otp to mobile
 * @param {mobile}
 * @return {otp}
 */
router.post('/otp', function(req, res) {
    let mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
        }
    });
});

/**
 * verify mobile and otp
 * @param {mobile,otp}
 * @return {json}
 */
router.post('/verify', function(req, res) {
    let data = {
        mobile: req.body.mobile,
        otp: req.body.otp
    };
    sms.verify(data, function(err, data) {
        if (err) {
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
        }
    });
});

module.exports = router;