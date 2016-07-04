var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
    request = require('request'),
    db = require('../database/db');

function sms() {
    EventEmitter.call(this);
}
util.inherits(sms, EventEmitter)

sms.prototype.otp = function(mobile, cb) {
    if (common.isMobile(mobile)) {
        db.demo.findOne({ "mobile": mobile }, function(err, existing) {
            if (existing) {
                var otp = (Math.floor(Math.random() * 90000) + 10000);
                common.sendOtp(mobile, otp);
                db.demo.update({
                    mobile: mobile
                }, {
                    $set: {
                        otp: otp
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, 'save successfully');
                    }
                })
            } else {
                cb("Number not existing ", null);
            }
        })

    } else {
        cb("false", null);
    }
}
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
                        otp: 0
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
}
sms.prototype.save = function(data, cb) {
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
        } else {
            console.log('existingUser at ' + i);
        }
    });
    cb(null, "save data");
};

sms.prototype.wit = function(d, cb) {
    if (common.isMobile(d.mobile)) {
        var url = process.env.witUrl || 'https://api.wit.ai/message?v=20160526&q=' + d.message,
            auth = process.env.witAuthToken || 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
        request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
            var data = r.body,
                intent = data.entities.intent[0].value,
                on_off = data.entities.on_off[0].value,
                datetime = data.entities.datetime[0].value;
            if (intent == 'Work' || intent == 'office' && on_off == 'on') {
                db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
                    if (existingUser) {
                        db.demo.update({ "mobile": d.mobile }, {
                            $set: {
                                inTime: datetime
                            }
                        }, function(err, data) {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null, "hi " + d.mobile + " ur in office now at " + datetime);
                            }
                        })
                    }
                })
            } else if (intent == 'Work' || intent == 'office' && on_off == 'off') {
                db.demo.findOne({ "mobile": d.mobile }, function(err, existingUser) {
                    if (existingUser) {
                        db.demo.update({ "mobile": d.mobile }, {
                            $set: {
                                outTime: datetime
                            }
                        }, function(err, data) {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null, "hi " + d.mobile + " ur in office now at " + datetime);
                            }
                        })
                    }
                })
            }
        })
    } else {
        cb("number not existing in db", null);
    }
}
module.exports = new sms;
