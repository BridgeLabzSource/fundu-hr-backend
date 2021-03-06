'use strict';
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
function msg() {
    EventEmitter.call(this);
}
util.inherits(msg, EventEmitter);

/** 
 * show time details to user
 * @param {d} -d recieved from msg controller
 * @param {cb} -callback to controller
 * @return {cb} -return cb either error or result
 */
function findinTime(data, d) {
    let witTime = d.time.slice(0, 10);
    let dbTime = data.inTime.slice(0, 10);
    return new Promise(function(resolve, reject) {
        if (witTime != dbTime) {
            resolve("no");
        } else {
            resolve(d.time);
        }
    })
}

function findoutTime(data, d) {
    let witTime = d.time.slice(0, 10);
    let dbTime = data.inTime.slice(0, 10);
    return new Promise(function(resolve, reject) {
        if (witTime == dbTime) {
            resolve({inTime:data.inTime,outTime:data.outTime});
        } else {
            resolve({inTime:'0',outTime:'0'});
        }
    })
}
msg.prototype.wit = function(d, cb) {
    db.userModel.findOne({ 'mobile': d.mobile }, function(err, existingUser) {
        if (existingUser) {
            if (d.on_off == 'on') {
                let result = {
                    userId: d.mobile,
                    inTime: d.time,
                    outTime: "0",
                    totalTime: "0",
                    type: d.type
                }
                if (existingUser.time.length == 0) {
                    cb(null, result);
                } else {
                    let res = existingUser.time.map(function(data, index, array) {
                        return findinTime(data, d);
                    })
                    Promise.all(res).then(function(values) {
                        let yes = 0;
                        let no = 0;
                        for (let i = 0; i <= values.length - 1; i++) {
                            (values[i].slice(0, 10).match(d.time.slice(0, 10))) ? yes++ : no++;
                        }
                        (yes <= 0) ? cb(null, result): cb("You have already entered intime", null);
                    })
                }
            } else if (d.on_off == 'off') {
                let yes = 0,
                    no = 0,
                    result = 0;
                let res = existingUser.time.map(function(data, index, array) {
                    return findoutTime(data, d);
                })
            
                Promise.all(res).then(function(values) {
                    console.log("res\n"+JSON.stringify(values))
                    
                    for (let i = 0; i <= values.length - 1; i++) {
                        if ((values[i].inTime.slice(0, 10).match(d.time.slice(0, 10)))&&values[i].outTime==0 ) {
                            console.log("inTime at "+i+":\n"+values[i].inTime+" and outTime"+values[i].outTime)
                            yes++;
                            let diff = moment.utc(moment(d.time, 'YYYY-MM-DD HH:mm:ss Z').diff(moment(values[i].inTime, 'YYYY-MM-DD HH:mm:ss Z'))).format('HH:mm:ss');
                            result = {
                                userId: d.mobile,
                                inTime: values[i].inTime,
                                outTime: d.time,
                                totalTime: diff,
                                type: d.type
                            }
                        } else if((values[i].inTime.slice(0, 10).match(d.time.slice(0, 10)))&&values[i].outTime!=0 ){
                            no++;
                        }
                    }
                    if (yes == 1) {
                        cb(null, result)
                    } else if(no==1) {
                        cb("You have already entered outTime", null);
                    }else{
                        cb("You have not entered inTime",null);
                    }
                })
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
        db.userModel.findOne({ 'mobile': data.mobile }, function(err, existingUser) {
            /* first time intime Entry at 0 postion of time array */
            if (data.outTime == 0) {
                if (existingUser.time.length == 0) {
                    db.userModel.update({ 'mobile': data.mobile }, {
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
                            cb(null, 'update');
                        }
                    })
                } else {
                    /* inTime entry in time array */
                    let yes = 0,
                        no = 0,
                        str, str1;
                    for (let i = 0; i <= existingUser.time.length - 1; i++) {
                        str = existingUser.time[i].inTime;
                        str = str.slice(0, 10);
                        str1 = data.inTime.slice(0, 10);
                        if (str == str1) {
                            yes++;
                        } else {
                            no++;
                        }
                    }
                    if (yes <= 0) {
                        db.userModel.update({ 'mobile': data.mobile }, {
                            $push: {
                                time: {
                                    inTime: data.inTime,
                                    outTime: 0,
                                    totalTime: 0
                                }
                            }
                        }, function(err, result) {
                            if (err) {
                                cb('err', null);
                            } else {
                                cb(null, 'update');
                            }
                        })
                    } else {
                        cb('You have already entered inTime', null);
                    }
                }
            } else {
                /* outTime entry in time array*/
                let yes = 0,
                    no = 0,
                    int = 0,
                    diff = 0;
                for (let i = 0; i <= existingUser.time.length - 1; i++) {
                    if (existingUser.time[i].inTime == data.inTime) {
                        yes++;
                        int = existingUser.time[i].inTime;
                        diff = moment.utc(moment(data.outTime, 'YYYY-MM-DD HH:mm:ss Z').diff(moment(int, 'YYYY-MM-DD HH:mm:ss Z'))).format('HH:mm:ss');

                    } else {
                        no++;
                    }
                }
                if (yes <= 1) {
                    db.userModel.update({ 'mobile': data.mobile, 'time': { $elemMatch: { inTime: int } } }, {
                            $set: {
                                'time.$.inTime': data.inTime,
                                'time.$.outTime': data.outTime,
                                'time.$.totalTime': diff
                            }
                        },
                        function(err, result) {
                            if (err) {
                                cb('err', null);
                            } else {
                                cb(null, "update");
                            }
                        })
                } else {
                    cb('You have not enter inTime', null);
                }
            }
        })
    } else {
        cb("You are not check", null);
    }
};

module.exports = new msg;
