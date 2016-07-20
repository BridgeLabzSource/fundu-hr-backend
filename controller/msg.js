/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    common = require('../helper/common'),
    msg = require('../model/msg'),
    errorMsg = require('../model/errorMsg'),
    witCtrl = require('./witCtrl');
/*
 * User send message
 * @param  JSON {commands}
 * @return JSON 
 */
router.post('/', function(req, res) {
    console.log("inside root")
    var mobile = req.body.mobile,
        message = req.body.message,
        intent = req.body.intent
    if (common.isMobile(mobile)) {
        witCtrl(message, "Work", function(err, data) {
            console.log("data " + JSON.stringify(data));
            console.log("errorMsg " + JSON.stringify(err));
            if (err) {
                errorMsg.save(err, function(err, result) {
                    if (err) { res.send(err) } else { res.send(result) }
                });
            } else {
                var result = {
                    mobile: mobile,
                    time: data.time,
                    on_off: data.on_off,
                    type:"attendance"
                }
                msg.wit(result, function(err, data1) {
                    if (err) {
                        res.json({ "err": err });
                    } else {
                        res.json({ "data": data1 });
                    }
                })
            }
        });
    } else { res.send("number not proper format") }
});

/**
 * update timeEntry in collection
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
