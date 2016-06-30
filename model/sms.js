var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    db = require('../database/db');


function sms() {
    EventEmitter.call(this);
}
util.inherits(sms, EventEmitter)

sms.prototype.otp = function(mobile, cb) {
    // if (common.isMobile(mobile)) {
    	console.log(common.sendOtp(mobile));
        // db.demo.findOne({ "mobile": mobile }, function(err, existing) {
        //     if (!existing) {
        //         var otp = (Math.floor(Math.random() * 90000) + 10000);
        //         cb(null, otp);
        //         var data = new db.demo({ "mobile": mobile, "otp": otp });
        //         data.save(function(err, data) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log(data);
        //             }
        //         })
        //     } else {
        //         cb("Number already existing ", null);
        //     }
        // })

    // } else {
    //     cb("false", null);
    // }
}
sms.prototype.verify = function(data, cb) {
    if (common.isMobile(data.mobile)) {
        db.demo.findOne({ "mobile": data.mobile, "otp": data.otp }, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                db.demo.update({
                    mobile: data.mobile,
                    otp: data.otp
                }, {
                    $set: {
                        otp: 0
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, "seccessfully register...");
                    }
                })
            }
        })
        cb(null, "true")
    } else {
        cb("false", null);
    }
}

module.exports = new sms;
// request({
// 	method:'get',
// 	uri:'https://5773bbfd5428410009000000:293f229133f20f57fd09193a8436c7a8@api.easysmsapp.com/accounts/5773bbfd5428410009000000',

// })