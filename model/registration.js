/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    db = require('../database/db');
/**
 * @constructor
 */
function registration() {
    EventEmitter.call(this);
}
util.inherits(registration, EventEmitter)


registration.prototype.register = function(d, cb) {
    console.log(JSON.stringify(d))
    if (common.isMobile(d.mobile) && common.isEmail(d.email) && (d.password == d.repassword)) {
        var data = new db.demo({ 'mobile': d.mobile, 'email': d.email, 'password': d.password })
        data.save(function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, 'Successfully registered!');
            }
        })
    } else {
        cb('Incorrect credential!! Check out once..', null)
    }
};

registration.prototype.login = function(d, cb) {
    if (common.isMobile(d.mobile)) {
        db.userModel.findOne({ 'mobile': d.mobile }, function(err, result) {
            if (!result || err) {
                cb('You have not registered', null);
            } else {
                db.userModel.findOne({ 'mobile': d.mobile, 'password': d.password }, function(err, result) {
                    if (!result || err) {
                        cb('Invalid password', null);
                    } else {
                        cb(null, 'Successfully Login');
                    }
                })
            }
        })
    } else {
        console.log('Incorrect mobile Number or password', null);
    }
};


module.exports = new registration;
