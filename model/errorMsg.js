/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    db = require('../database/db');
/**
 * @constructor
 */
function errorMsg() {
    EventEmitter.call(this);
}
util.inherits(errorMsg, EventEmitter)

/** 
 * In this function send message,mobile and send message user
 * @param {d}
 * @param {cb}
 */
errorMsg.prototype.save = function(d, cb) {
    console.log("errorMsg 007 :" + JSON.stringify(d));
    // cb(null,d);
    var data = new db.errorMsg({ "message": d.msg, "response": d.error })
    data.save(function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, "please try again...")
        }
    })
};

module.exports = new errorMsg;
