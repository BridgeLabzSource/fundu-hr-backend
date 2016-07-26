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
    console.log("data : "+data[0])
    // for (var i = 0; i <= data.length - 1; i++) {
    //     db.userModel.findOne({ 'empId': data[i].empId }, function(err, existing) {
    //         if (!existing) {
    //             console.log("inside  not existing")
    //             var data = new db.userModel(data[i]);
    //             data.save(function(err, result) {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     console.log(result);
    //                 }
    //             })
    //         } else if (existing.empId == data[i].empId) {
    //             console.log("inside existing")
    //             db.userModel.update({
    //                 'empId': data[i].empId
    //             }, {
    //                 $set: {
    //                     'empName': data[i].empName,
    //                     'Designation': data[i].Designation,
    //                     'BL_start_date': data[i].BL_start_date,
    //                     'start_date_at_company': data[i].start_date_at_company,
    //                     'End_Date': data[i].End_Date,
    //                     'Mobile': data[i].Mobile,
    //                     'PAN_card': data[i].PAN_card,
    //                     'email': data[i].email,
    //                     'DOB': data[i].DOB,
    //                     'Emp_contract_signed': data[i].Emp_contract_signed,
    //                     'offer_letter': data[i].offer_letter,
    //                     'Emp_form_CSR': data[i].Emp_form_CSR,
    //                     'original_submitted': data[i].original_submitted
    //                 }
    //             }, function(err, result) {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     console.log(result);
    //                 }
    //             });
    //         }
    //     })
    // }
    // cb(null,update);
};

module.exports = new excel;
