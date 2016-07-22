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
 * save error message in collections
 * @param {d} -d from msg controller 
 * @param {cb} -callback to msg conroller
 * @return {cb} -return cb either error or result
 */
errorMsg.prototype.save = function(d, cb) {
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