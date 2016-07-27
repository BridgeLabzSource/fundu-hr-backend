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
    console.log("data : " + JSON.stringify(data.length) + "\n");
    console.log("data : " + JSON.stringify(data[3][1]));
    var dataLen = data.length - 1;
    console.log(dataLen);
    for (var i = 0; i <= dataLen; i++) {
        console.log(i + " inside for loop : " + data[i][7]);
        // var re=JSON.stringify(db.userModel.find({'empId':data[i][1]}));
        // console.log("find   :"+re);
        var find = data[i][1];
        console.log('before i : ' + i);

        var promise = new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            db.userModel.findOne({ 'mobile': data[i][1] }, function(err, exist) {
                if (!exist) {
                    console.log("resolve");
                    resolve("Stuff worked!");
                } else {
                    console.log("reject");
                    reject(Error("It broke"));
                }
            })
        });
    }
    cb(null, "update");
};

module.exports = new excel;
