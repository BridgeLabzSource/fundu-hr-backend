/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    db = require('../database/db');
/**
 * @constructor
 */
function excel() {
    EventEmitter.call(this);
}
util.inherits(excel, EventEmitter);

/** 
 * extract user data from google spreadsheet and save in collection
 * @param {data} -data from sms controller
 * @param {cb} -callback to sms controller
 * @return {cb} -return cb either error or result
 */
excel.prototype.save = function(data, cb) {
    console.log("data : " + JSON.stringify(data.length)+"\n");
    console.log("data : " + JSON.stringify(data[0][1]));
    for (var i = 0; i <= data.length-1; i++) {
        console.log("inside for loop : "+data[i][7]);
        db.userModel.findOne({ 'empId': data[i][1] }, function(err, existing) {
            console.log("inside for loop : "+existing);
            if (!existing) {
                console.log("inside  not existing :"+data[i][1])
                var data = new db.userModel({
                    'srId': data[i][0],
                    'empId': data[i][1],
                    'empName': data[i][2],
                    'designation': data[i][3],
                    'blStartDate': data[i][4],
                    'startDateAtCompany': data[i][5],
                    'endDate': data[i][6],
                    'mobile': data[i][7],
                    'panCard': data[i][8],
                    'email': data[i][9],
                    'dob': data[i][10],
                    'empContractSigned': data[i][11],
                    'offerLetter': data[i][12],
                    'empFormCsr': data[i][13],
                    'originalSubmitted': data[i][14]
                });
                data.save(function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result);
                    }
                })
            } else if (existing.empId == data[i][1]) {
                console.log("inside existing")
                db.userModel.update({
                    'empId': data[i][1]
                }, {
                    $set: {
                        'empName': data[i][2],
                        'designation': data[i][3],
                        'blStartDate': data[i][4],
                        'startDateAtCompany': data[i][5],
                        'endDate': data[i][6],
                        'mobile': data[i][7],
                        'panCard': data[i][8],
                        'email': data[i][9],
                        'dob': data[i][10],
                        'empContractSigned': data[i][11],
                        'offerLetter': data[i][12],
                        'empFormCsr': data[i][13],
                        'originalSubmitted': data[i][14]
                    }
                }, function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result);
                    }
                });
            }
        })
    }
    cb(null, "update");
};

module.exports = new excel;
