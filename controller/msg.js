/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    common = require('../helper/common'),
    msg = require('../model/msg');
witCtrl = require('./witCtrl');
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

/*
    Process commands
    @param  JSON {commands}
    @return JSON 
*/
router.post('/', function(req, res) {
    console.log("inside root")
    var mobile = req.body.mobile,
        message = req.body.message,
        attendance = req.body.attendance
    if (typeof attendance == 'string' && common.isMobile(mobile)) {
        console.log("true")
        witCtrl(message, "Work", function(data) {
            var result = {
                mobile: mobile,
                time: data.time,
                on_off: data.on_off
            }
            msg.wit(result, function(err, data1) {
                if (err) {

                    res.send(err);
                } else {
                    res.send(data1);
                }
            })
        });
    } else { console.log("errr") }
});

/**
 * call timeEntryConform
 * @param {check,mobile,inTime,outTime,totalTime}
 * @return {response}
 */
router.post('/timeEntryConform', function(req, res) {
    var data = {
        check: req.body.check,
        mobile: req.body.mobile,
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
