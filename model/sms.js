/**
 * define require module
 */
let util = require('util'),
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
util.inherits(sms, EventEmitter);

/** 
 * send otp to user mobile if number exist in collection then update otp in collection
 * @param {mobile} -send mobile from sms controller
 * @param {cb} -callback to controller
 * @return {cb} -return cb either error or result
 */
sms.prototype.otp = function(mobile, cb) {
    if (common.isMobile(mobile)) {
        let query = { 'mobile': mobile },
            update = { $set: { 'otp': 123456 } };
        // var options = { upsert: true, returnNewDocument: true };
        db.userModel.findOneAndUpdate(query, update, function(err, person) {
            if (err) {
                cb(err, null);
            } else if (!err && person) {
                cb(null, otp);
            } else if (!err && !person) {
                cb('Number not existing', null);
            }
        });
    } else {
        cb('Mobile not proper Format', null);
    }
}

/** 
 * user send mobile and otp to user if exist in collection then update otp as zero in collection
 * @param {data} -data from sms controller
 * @param {cb} -callback to sms controller
 * @return {cb} -return cb either error or result
 */
sms.prototype.verify = function(data, cb) {
    if (common.isMobile(data.mobile)) {
        let query = { 'mobile': data.mobile, 'otp': data.otp },
            update = { $set: { 'otp': 123456 } },
            options = { upsert: true, returnNewDocument: true };
            db.userModel.findOneAndUpdate(query, update, options, function(err, person) {
                if (err) {
                    cb(err, null);
                } else if (!err && person) {
                    cb(null, 'seccessfully register...');
                } else if (!err && !person) {
                    cb('Number not existing', null);
                }
            });
    } else {
        cb('Mobile not proper Format', null);
    }
}

module.exports = new sms;
