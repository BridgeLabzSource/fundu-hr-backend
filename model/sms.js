var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    common = require('../helper/common'),
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
                d.demo.update({
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
    for (var i = 0; i <data.length - 1; i++) {
        console.log("mobile " + data[i][7].Mobile + " and " + i);

        db.userModel.findOne({ "Mobile": data[i][7].Mobile }, function(err, existingUser) {
            if (existingUser) {
                console.log(existingUser.Mobile + " and " + i);
            } else {
                console.log('already not exit' + i);
                var dbSave = new db.userModel({
                    "sr_id": data[i][0].sr_id,
                    "empId": data[i][1].empId,
                    "empName": data[i][2].empName,
                    "Designation": data[i][3].Designation,
                    "BL_start_date": data[i][4].BL_start_date,
                    "start_date_at_company": data[i][5].start_date_at_company,
                    "End_Date": data[i][6].End_Date,
                    "Mobile": data[i][7].Mobile,
                    "PAN_card": data[i][8].PAN_card,
                    "email": data[i][9].email,
                    "DOB": data[i][10].DOB,
                    "Emp_contract_signed": data[i][11].Emp_contract_signed,
                    "offer_letter": data[i][12].offer_letter,
                    "Emp_form_CSR": data[i][13].Emp_form_CSR,
                    "original_submitted": data[i][14].original_submitted
                });
                console.log(dbSave);

                dbSave.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('successfully save');
                    }
                });
            }
        });
    }
    cb(null, "save data");
}
module.exports = new sms;


// {"sr_id":1,"empId": 1,"empName":"chandan Mandre","Designation":"software engineer","BL_start_date":"2015-01-11T18:30:00.000Z","start_date_at_company":"2015-01-11T18:30:00.000Z","End_Date":"2016-01-05T18:30:00.000Z","Mobile":"+917276447408","PAN_card":"Sdjdfd","email":"chandan@gmail.com","DOB":"1991-04-02T18:30:00.000Z","Emp_contract_signed":"yes","offer_letter":"yes","Emp_form_CSR":"yes","original_submitted":"no"}
