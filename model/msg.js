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
 * show time details to user
 * @param {d} -d recieved from msg controller
 * @param {cb} -callback to controller
 * @return {cb} -return cb either error or result
 */
msg.prototype.wit = function(d, cb) {
    db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
        if (existingUser) {
            if (d.on_off == 'on') {
                var result = {
                    userId: d.mobile,
                    inTime: d.time,
                    outTime: "0",
                    totalTime: "0",
                    type: d.type
                }
                if (existingUser.time.length == 0) {
                    cb(null, result);
                } else {
                    for (var i = 0; i <= existingUser.time.length - 1; i++) {
                        var inTime;
                        str = existingUser.time[i].inTime;
                        str = str.slice(0, 10)
                        str1 = d.time.slice(0, 10);
                        if (str != str1) {
                            cb(null, result);
                        } else {
                            cb("You are already enter time ", null)
                        }
                        cb(null, result)
                    }
                }
            } else if (d.on_off == 'off') {
                for (var i = 0; i <= existingUser.time.length - 1; i++) {
                    str = existingUser.time[i].inTime;
                    str = str.slice(0, 10)
                    str1 = d.time.slice(0, 10);
                    if (str == str1) {
                        var diff = moment.utc(moment(d.time, "YYYY-MM-DD HH:mm:ss Z").diff(moment(existingUser.time[i].inTime, "YYYY-MM-DD HH:mm:ss Z"))).format("HH:mm:ss");
                        var result = {
                            userId: existingUser.mobile,
                            inTime: existingUser.time[i].inTime,
                            outTime: d.time,
                            totalTime: diff,
                            type: d.type
                        }
                        cb(null, result);
                    } else {
                        cb("You have not enter inTime", null);
                    }
                }
            }
        } else {
            cb('not exit in db', null);
        }
    })
};

/** 
 * take conform msg from user then update in collection
 * @param {data} -data from msg controller for update inTime,outTime and TotalTime in collection
 * @param {cb} -callback to controller
 * @return {cb} -return cb either error or result
 */
msg.prototype.conform = function(data, cb) {
    if (data.check == 'true') {
        db.demo.findOne({ "mobile": data.mobile }, function(err, existingUser) {
            /* first time intime Entry at 0 postion of time array */
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
                    /* inTime entry in time array */
                    for (var i = 0; i <= existingUser.time.length - 1; i++) {
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
                                    cb(null, "update");
                                }
                            })
                        } else {
                            cb("already update time", null)
                        }
                    }
                }
            } else {
                /* outTime entry in time array*/
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
                                    cb(null, "update")
                                }
                            })
                    } else {
                        cb("You have not enter inTime", null);
                    }
                }
            }
        })
    } else {
        cb("You are not check", null);
    }
};

module.exports = new msg;
