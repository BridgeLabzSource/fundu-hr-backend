/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    request = require('request'),
    moment = require('moment'),
    db = require('../database/db');
/**
 * @constructor
 */
function sms() {
    EventEmitter.call(this);
}
util.inherits(sms, EventEmitter)

/** 
 * send otp to user mobile if number exist in collection then update otp in collection
 * @param {mobile} -send mobile from sms controller
 * @param {cb} -callback to controller
 * @return {cb} -return cb either error or result
 */
sms.prototype.otp = function(mobile, cb) {
    if (common.isMobile(mobile)) {
        db.demo.findOne({ 'mobile': mobile }, function(err, existing) {
            if (existing) {
                // var otp = (Math.floor(Math.random() * 90000) + 10000);
                // common.sendOtp(mobile, otp);
                var otp = 123456
                db.demo.update({
                    mobile: mobile
                }, {
                    $set: {
                        otp: 123456
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, otp);
                    }
                })
            } else {
                cb('Number not existing ', null);
            }
        })
    } else {
        cb('Mobile not proper Format', null);
    }
};

/** 
 * user send mobile and otp to user if exist in collection then update otp as zero in collection
 * @param {data} -data from sms controller
 * @param {cb} -callback to sms controller
 * @return {cb} -return cb either error or result
 */
sms.prototype.verify = function(data, cb) {
    if (common.isMobile(data.mobile)) {
        db.demo.findOne({ 'mobile': data.mobile, 'otp': data.otp }, function(err, result) {
            console.log(" result "+result);
            if (err || !result) {
                cb(err, null);
            } else {
                db.demo.update({
                    mobile: data.mobile
                }, {
                    $set: {
                        otp: 123456,
                        time: []
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, 'seccessfully register...');
                    }
                })
            }
        })
    } else {
        cb('Mobile not proper Format', null);
    }
};

module.exports = new sms;
