/**
 * define require module
 */
var util = require('util') ,
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
    console.log("wit :"+JSON.stringify(d));
    db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
        if (existingUser) {
                if (d.on_off == 'on') {
                    if (existingUser.time.length == 0) {
                        var result = {
                            userId: d.mobile,
                            inTime: d.time,
                            outTime: 0,
                            totalTime: 0
                        }
                        cb(null, result);
                    } else {
                        for (var i = 0; i <= existingUser.time.length; i++) {
                            var inTime;
                            str = existingUser.time[i].inTime;
                            str = str.slice(0, 10)
                            str1 = d.time.slice(0, 10);
                            if (str != str1) {
                                var result = {
                                    userId: d.mobile,
                                    inTime: d.time,
                                    outTime: 0,
                                    totalTime: 0
                                }
                                cb(null, result);
                                break;
                            } else {
                                cb("You are already enter time ", null)
                                break;
                            }
                            cb(null, result)
                        }
                    }
                } else if (d.on_off == 'off') {
                    console.log("on_off : "+d.on_off)
                    for (var i = 0; i <= existingUser.time.length; i++) {
                        console.log(existingUser)
                        str = existingUser.time[i].inTime;
                        str = str.slice(0, 10)
                        str1 = d.time.slice(0, 10);
                        if (str == str1) {
                            var diff = moment.utc(moment(d.time, "YYYY-MM-DD HH:mm:ss Z").diff(moment(existingUser.time[i].inTime, "YYYY-MM-DD HH:mm:ss Z"))).format("HH:mm:ss");
                            var result = {
                                userId: existingUser.mobile,
                                inTime: existingUser.time[i].inTime,
                                outTime: d.time,
                                totalTime: diff
                            }
                            cb(null, result);
                            break;
                        }
                    }
                }
        } else {
            cb('not exit in db', null);
        }
    })
};

/** 
 * In this function user send data for conformation to update time
 * @param {data}
 * @param {cb}
 */
msg.prototype.conform = function(data, cb) {
    console.log("data :"+data+"\n")
    if (data.check == 'true') {
        db.demo.findOne({ "mobile": data.mobile }, function(err, existingUser) {
            /*
             * first time intime Entry at 0 postion of time array
             */
            if (data.outTime == 0) {
                if (existingUser.time.length == 0) {
                    db.demo.update({ "mobile": data.mobile }, {
                        $push: {
                            time: {
                                inTime: data.inTime,
                                outTime: 0,
                                totalTime: 0
                            }
                        }
                    }, function(err, result) {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, "update");
                        }
                    })
                } else {
                    for (var i = 0; i <= existingUser.time.length - 1; i++) {
                        /*
                         * inTime entry in time array
                         */
                         var inTime;
                            str = existingUser.time[i].inTime;
                            str = str.slice(0, 10)
                            str1 = data.inTime.slice(0, 10);
                        if (str != str1) {
                            db.demo.update({ "mobile": data.mobile }, {
                                $push: {
                                    time: {
                                        inTime: data.inTime,
                                        outTime: 0,
                                        totalTime: 0
                                    }
                                }
                            }, function(err, result) {
                                if (err) {
                                    cb("err", null);
                                } else {
                                    console.log("update")
                                }
                            })
                            cb(null, "update");
                                    break;
                        } else {
                            cb("already update time", null)
                            break;
                        }
                    }
                }
            } else {
                /*
                 * outTime entry in time array
                 */
                for (var i = 0; i <= existingUser.time.length - 1; i++) {
                    if (existingUser.time[i].inTime == data.inTime) {
                        var diff = moment.utc(moment(data.outTime, "YYYY-MM-DD HH:mm:ss Z").diff(moment(existingUser.time[0].inTime, "YYYY-MM-DD HH:mm:ss Z"))).format("HH:mm:ss");
                        db.demo.update({ "mobile": data.mobile, "time": { $elemMatch: { inTime: existingUser.time[i].inTime } } }, {
                                $set: {
                                    "time.$.inTime": data.inTime,
                                    "time.$.outTime": data.outTime,
                                    "time.$.totalTime": diff
                                }
                            },
                            function(err, result) {
                                if (err) {
                                    cb("err", null);
                                } else {
                                    console.log(result);
                                }
                            })
                        cb(null, "update");
                        break;
                    }
                }
            }
        })
    } else {
        cb("You are not check", null);
    }
};

module.exports = new msg;
