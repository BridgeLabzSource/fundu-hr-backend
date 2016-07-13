/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    msg = require('../model/msg');

/**
 * call timeEntryMsg
 * @param {message,mobile}
 * @return {response}
 */
router.post('/timeEntryMsg', function(req, res) {
    var data = {
        message: req.body.message,
        mobile: req.body.mobile
    };
    msg.wit(data, function(err, data) {
        if (err) {
            res.json({ "err": err });
        } else {
            res.json({ "data": data });
        }
    })
});

/**
 * call timeEntryConform
 * @param {check,mobile,inTime,outTime,totalTime}
 * @return {response}
 */
router.post('/timeEntryConform', function(req, res) {
    var data = {
        check: req.body.check,
        userId: req.body.mobile,
        inTime: req.body.inTime,
        outTime: req.body.outTime,
        totalTime: req.body.totalTime
    };
    msg.conform(data, function(err, data) {
        if (err) {
            res.json({ "err": err });
        } else {
            res.json({ "data": data });
        }
    })
});

module.exports = router;
