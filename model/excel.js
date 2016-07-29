/**
 * define require module
 */
let util = require('util'),
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
 **/
excel.prototype.save = function(data, cb) {
    let i = 0;
    let res = data.map(function(d, index, array) {
        return save2(d);
    });
    console.log(res);
    Promise.all(res).then(function(values) {
        console.log("values" + values);
        cb(null,"update");
    });
}

function save2(data) {
    return new Promise(function(resolve, reject) {
        let query = { 'empId': data[1] };
        let update = { $set: { 'empName': data[2], 'designation': data[3], 'blStartDate': data[4], 'startDateAtCompany': data[5], 'endDate': data[6], 'mobile': '+91'+data[7], 'panCard': data[8], 'email': data[9], 'dob': data[10], 'empContractSigned': data[11], 'offerLetter': data[12], 'empFormCsr': data[13], 'originalSubmitted': data[14],'password':data[7] ,'time':[]} }
        let options = { upsert: true, returnNewDocument: true };
        db.userModel.findOneAndUpdate(query, update, options, function(err, person) {
            if (err) {
                reject("rejec")
            } else if (!err && person) {
                console.log("person");
                resolve("update");
            } else if (!err && !person) {
                console.log("not person " + data);
                resolve("insert");
            }
        });
    });
}


module.exports = new excel();
