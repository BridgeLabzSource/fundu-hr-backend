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
function msg() {
    EventEmitter.call(this);
}
util.inherits(msg, EventEmitter)

/** 
 * In this function send message,mobile and send message user
 * @param {d}
 * @param {cb}
 */
msg.prototype.wit = function(d, cb) {
    if (common.isMobile(d.mobile)) {
        console.log("true")
        db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
            if (existingUser) {
                console.log('inside existingUser')
                var url = process.env.witUrl || 'https://api.wit.ai/message?v=20160526&q=' + d.message,
                    auth = process.env.witAuthToken || 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
                request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
                    console.log("inside request url")
                    var data = r.body,
                        intent = data.entities.intent[0].value,
                        on_off = data.entities.on_off[0].value,
                        datetime=moment().zone("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                        // datetime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                    console.log(datetime);
                    if (intent == 'Work' || intent == 'office' && on_off == 'on') {
                        console.log("inside if "+intent+" and "+on_off);
                        var result = {
                            userId: d.mobile,
                            inTime: datetime,
                            outTime: 0,
                            totalTime: 0
                        }
                        cb(null, result);
                    } else if (intent == 'Work' || intent == 'office' && on_off == 'off') {
                        console.log("inside else "+intent+" and "+on_off);
                        var diff = moment.utc(moment(datetime, "YYYY-MM-DD HH:mm:ss").diff(moment(existingUser.inTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
                        var result = {
                            userId: existingUser.mobile,
                            inTime: existingUser.time[0].inTime,
                            outTime: datetime,
                            totalTime: diff
                        }
                        cb(null, result);
                    }
                })
            } else {
                cb('not exit in db', null);
            }
        })
    } else {
        cb('number not proper format', null);
    }
};

/** 
 * In this function user send data for conformation to update time
 * @param {data}
 * @param {cb}
 */
msg.prototype.conform = function(data, cb) {
    if (data.check == 'true') {
        db.demo.findOne({ "mobile": data.userId }, function(err, existingUser) {
            console.log("existingUser :"+existingUser);
            for (var i = 0; i <= existingUser.time.length - 1; i++) {
                console.log(i + " and length " + existingUser.time.length)
                if (existingUser.time[i].inTime != data.inTime) {
                    console.log('inside if')
                    db.demo.update({
                        mobile: data.userId
                    }, {
                        $push: {
                            "time": {
                                inTime: data.inTime,
                                outTime: data.outTime,
                                totalTime: 0
                            }
                        }
                    }, function(err, result) {
                        if (err) {
                            // cb(err, null);
                            console.log("err \n" + err);
                        } else {
                            // cb(null, "update");
                            console.log(result);
                        }
                    });
                    break;
                } else if (existingUser.time[i].inTime == data.inTime && data.outTime) {
                    console.log('inside else');
                    var diff = moment.utc(moment(data.outTime, "YYYY-MM-DD HH:mm:ss").diff(moment(data.inTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss")
                    db.demo.update({
                        mobile: data.userId
                    }, {
                        $set: {
                            "time": {
                                inTime: data.inTime,
                                outTime: data.outTime,
                                totalTime: diff
                            }
                        }
                    }, function(err, result) {
                        if (err) {
                            cb(err, null);
                        } else {
                            // cb(null, "update");

                        }
                    });
                    break;
                }

            }

        })
        cb(null, "update");
    } else {
        cb("You are not check", null);
    }
};

module.exports = new msg;
