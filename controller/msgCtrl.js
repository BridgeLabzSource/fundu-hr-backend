/**
 * define require module
 */
let express = require('express'),
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
    let mobile = req.body.mobile,
        message = req.body.message;
    if (common.isMobile(mobile)) {
        witCtrl.message(message, 'Work', function(err, data) {
            if (err) {
                errorMsg.save(err, function(err, result) {
                    if (err) {
                        res.json({ 'err': err });
                    } else {
                        res.json({ 'data': result });
                    }
                });
            } else {
                let result = {
                    mobile: mobile,
                    time: data.time,
                    on_off: data.on_off,
                    type: 'attendance'
                }
                msg.wit(result, function(err, data1) {
                    if (err) {
                        res.json({ 'err': err });
                    } else {
                        res.json({ 'data': data1 });
                    }
                })
            }
        });
    } else { res.json({ 'data': 'Number not proper format' }) }
});

/**
 * update timeEntry in collection
 * @param {check,mobile,inTime,outTime,totalTime}
 * @return {response}
 */
router.post('/timeEntryConform', function(req, res) {
    let data = {
        check: req.body.check,
        mobile: req.body.mobile,
        inTime: req.body.inTime,
        outTime: req.body.outTime,
        totalTime: req.body.totalTime
    };
    msg.conform(data, function(err, data) {
        if (err) {
            res.json({ 'err': err });
        } else {
            res.json({ 'data': data });
        }
    })
});

module.exports = router;
