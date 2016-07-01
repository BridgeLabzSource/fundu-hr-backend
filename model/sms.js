var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    db = require('../database/db');

function sms() {
    EventEmitter.call(this);
}
util.inherits(sms, EventEmitter)

sms.prototype.otp = function(mobile, cb) {
    if (common.isMobile(mobile)) {
        db.demo.findOne({ "mobile": mobile }, function(err, existing) {
            if (!existing) {
                var otp = (Math.floor(Math.random() * 90000) + 10000);
                common.sendOtp(mobile,otp);
                var data = new db.demo({ "mobile": mobile, "otp": otp });
                data.save(function(err, data) {
                    if (err) {
                        cb(err,null);
                    } else {
                        cb(null,'save successfully');
                    }
                })
            } else {
                cb("Number already existing ", null);
            }
        })

    } else {
        cb("false", null);
    }
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
    } else {
        cb("false", null);
    }
}

module.exports = new sms;