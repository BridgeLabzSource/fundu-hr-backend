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
        console.log("message  " + d.message)
        db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
            if (existingUser) {
                console.log('inside existingUser')
                var url = process.env.witUrl || 'https://api.wit.ai/message?v=20160526&q=' + d.message,
                    auth = process.env.witAuthToken || 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
                request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
                    console.log("error :" + JSON.stringify(ee))
                    console.log("r :" + JSON.stringify(r));
                    console.log("body :" + JSON.stringify(body))
                    var intent = body.entities.intent[0].value,
                        on_off = body.entities.on_off[0].value,
                        datetime = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss Z");
                    console.log(datetime);
                    if ((body.entities.intent[0].confidence >= 0.8) || (body.entities.location[0].confidence >= 0.8)) {
                        if ((intent == 'Work' || intent == 'office') && on_off == 'on') {
                            console.log("inside if " + intent + " and " + on_off);
                            // db.demo.findOne({ "mobile": d.mobile }, function(error, exist) {
                                console.log(existingUser);
                                if (existingUser.time.length == 0) {
                                    var result = {
                                        userId: d.mobile,
                                        inTime: datetime,
                                        outTime: 0,
                                        totalTime: 0
                                    }
                                    console.log("result : " + result)
                                    cb(null, result);
                                } else {
                                    for (var i = 0; i <= existingUser.time.length; i++) {
                                        var inTime;
                                        str = existingUser.time[i].inTime;
                                        str = str.slice(0, 10)
                                        str1 = datetime.slice(0, 10);
                                        console.log("str 1 :" + str1);
                                        if (str != str1) {
                                            var result = {
                                                userId: d.mobile,
                                                inTime: datetime,
                                                outTime: 0,
                                                totalTime: 0
                                            }
                                            console.log("result : " + result)
                                            cb(null, result);
                                            break;
                                        } else {

                                            console.log("already exist")
                                            cb("You are already enter time ", null)
                                            break;
                                        }
                                        cb(null, result)
                                    }
                                }
                            // })
                        } else if ((intent == 'Work' || intent == 'office') && on_off == 'off') {
                            console.log("inside else " + intent + " and " + on_off);
                            // db.demo.findOne({ "mobile": d.mobile }, function(error, exist) {
                                consolr.log(existingUser.time.inTime);
                                for (var i = 0; i <= existingUser.time.length; i++) {
                                    console.log(existingUser.time[i].inTime);
                                    if (existingUser.time[i].inTime == undefined) {
                                        cb("You have not enter inTime", null)
                                    } else {
                                        var str = existingUser.time[i].inTime;
                                        str = str.slice(0, 10)
                                        str1 = datetime.slice(0, 10);
                                        if (str == str1) {
                                            var diff = moment.utc(moment(datetime, "YYYY-MM-DD HH:mm:ss Z").diff(moment(existingUser.time[i].inTime, "YYYY-MM-DD HH:mm:ss Z"))).format("HH:mm:ss");
                                            console.log(diff);
                                            var result = {
                                                userId: existingUser.mobile,
                                                inTime: existingUser.time[i].inTime,
                                                outTime: datetime,
                                                totalTime: diff
                                            }
                                            cb(null, result);
                                            break;
                                        }
                                    }
                                }
                            // })
                        }
                    }else{
                        cb("Please enter time again",null);
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
    console.log(data)
    if (data.check == 'true') {
        db.demo.findOne({ "mobile": data.mobile }, function(err, existingUser) {
            /*
             * first time intime Entry at 0 postion of time array
             */
            if (data.outTime == 0) {
                console.log(existingUser)
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
                            console.log(err);
                        } else {
                            console.log(result);
                            cb(null, "update");
                        }
                    })
                } else {
                    for (var i = 0; i <= existingUser.time.length - 1; i++) {
                        /*
                         * inTime entry in time array
                         */
                        if (existingUser.time[i].inTime != data.inTime) {
                            console.log("second else " + existingUser.time[i].inTime + " actual " + data.inTime);
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
                                    console.log(err);
                                    cb("err", null);
                                } else {
                                    console.log(result);
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
                        console.log("second else..... " + existingUser.time[i].inTime + " actual " + data.inTime);
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
                                    console.log(err);
                                    cb("err", null);
                                } else {
                                    console.log(result);

                                }
                            })
                        cb(null, "update");
                        break;
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
