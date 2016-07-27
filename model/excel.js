/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    db = require('../database/db'),
    common = require('../helper/common');
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
    // console.log("data : " + JSON.stringify(data.length) + "\n");
    // console.log("data : " + JSON.stringify(data[3][1]));
    var dataLen = data.length - 1;
    console.log(dataLen);
    for (var i = 0; i <= dataLen; i++) {
        // console.log(i + " inside for loop : " + data[i][7]);
        // var re=JSON.stringify(db.userModel.find({'empId':data[i][1]}));
        // console.log("find   :"+re);
        console.log('before i : ' + i);

        var promise = new Promise(function(resolve, reject) {
            console.log("after i :" + i+" and "+data[i][1]);
            db.userModel.findOne({ 'empId': data[i][1] }, function(err, exist) {
                console.log("exist :"+exist);
                if (!exist) {
                    var dd = new db.userModel({
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
                    })
                    dd.save(function(err, result) {
                        if (result) {
                            console.log(result)
                        }
                    })
                      console.log("resolve")
                    resolve("resolve");
                } else {
                    console.log("reject")
                    reject(Error("It broke"));
                }
            });
        });
        cb(null, "update");
    }
}

module.exports = new excel();
