/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    request = require('request'),
    moment = require('moment-timezone'),
    db = require('../database/db');
/**
 * @constructor
 */
function sms() {
    EventEmitter.call(this);
}
util.inherits(sms, EventEmitter)

/** 
 * In this function send otp to mobile if exist in database then
 * update otp in database
 * @param {mobile}
 * @param {cb}
 */
sms.prototype.otp = function(mobile, cb) {
    if (common.isMobile(mobile)) {
        db.demo.findOne({ "mobile": mobile }, function(err, existing) {
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
                cb("Number not existing ", null);
            }
        })
    } else {
        cb("false", null);
    }
};

/** 
 * In this function send mobile and otp to user if exist in database then
 * update otp as zero in database
 * @param {data}
 * @param {cb}
 */
sms.prototype.verify = function(data, cb) {
    if (common.isMobile(data.mobile)) {
        db.demo.findOne({ "mobile": data.mobile, "otp": data.otp }, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                db.demo.update({
                    mobile: data.mobile,
                    otp: data.otp
                }, {
                    $set: {
                        otp: 123456
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, "seccessfully register...");
                    }
                })
            }
        })
    } else {
        cb("false", null);
    }
};

/** 
 * In this function spreadsheet data in database
 * @param {data}
 * @param {cb}
 */
sms.prototype.save = function(data, cb) {
    if (common.isMobile(data[0][7].Mobile)) {
        db.userModel.findOne({ "Mobile": data[0][7].Mobile }, function(err, existingUser) {
            if (!existingUser) {
                var dbSave = new db.userModel({
                    "srId": data[0][0].sr_id,
                    "empId": data[0][1].empId,
                    "empName": data[0][2].empName,
                    "designation": data[0][3].Designation,
                    "blStartDate": data[0][4].BL_start_date,
                    "startDateAtCompany": data[0][5].start_date_at_company,
                    "endDate": data[0][6].End_Date,
                    "mobile": data[0][7].Mobile,
                    "panCard": data[0][8].PAN_card,
                    "email": data[0][9].email,
                    "dob": data[0][10].DOB,
                    "empContractSigned": data[0][11].Emp_contract_signed,
                    "offerLetter": data[0][12].offer_letter,
                    "empFormCsr": data[0][13].Emp_form_CSR,
                    "originalSubmitted": data[0][14].original_submitted
                });
                dbSave.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('successfully save');
                    }
                });
            }
        });
        cb(null, "save data");
    } else {
        cb("Number not proper", null);
    }
};

/** 
 * In this function send message,mobile and send message user
 * @param {d}
 * @param {cb}
 */
sms.prototype.wit = function(d, cb) {
    if (common.isMobile(d.mobile)) {
        db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
            if (existingUser) {
                var url = process.env.witUrl || 'https://api.wit.ai/message?v=20160526&q=' + d.message,
                    auth = process.env.witAuthToken || 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
                request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
                    var data = r.body,
                        intent = data.entities.intent[0].value,
                        on_off = data.entities.on_off[0].value,
                        datetime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                    console.log(datetime);
                    if (intent == 'Work' || intent == 'office' && on_off == 'on') {
                        var result = {
                            userId: d.mobile,
                            inTime: datetime,
                            outTime: 0,
                            totalTime: 0
                        }
                        cb(null, result);
                    } else if (intent == 'Work' || intent == 'office' && on_off == 'off') {
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
sms.prototype.conform = function(data, cb) {
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

sms.prototype.demo = function(data, cb) {
    db.demo.findOne({ "mobile": data.userId })
        .populate("userAttendance")
        .exec(function(err, person) {
            if (err) {
                console.log(err);
            } else {
                console.log('JSON for person is :' + person);
            }
        })
}
module.exports = new sms;
