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
    console.log(data);
    // if (common.isMobile(data[0][7].Mobile)) {
    //     db.userModel.findOne({ 'Mobile': data[0][7].Mobile }, function(err, existingUser) {
    //         if (!existingUser) {
    //             var dbSave = new db.userModel({
    //                 'srId': data[0][0].sr_id,
    //                 'empId': data[0][1].empId,
    //                 'empName': data[0][2].empName,
    //                 'designation': data[0][3].Designation,
    //                 'blStartDate': data[0][4].BL_start_date,
    //                 'startDateAtCompany': data[0][5].start_date_at_company,
    //                 'endDate': data[0][6].End_Date,
    //                 'mobile': data[0][7].Mobile,
    //                 'panCard': data[0][8].PAN_card,
    //                 'email': data[0][9].email,
    //                 'dob': data[0][10].DOB,
    //                 'empContractSigned': data[0][11].Emp_contract_signed,
    //                 'offerLetter': data[0][12].offer_letter,
    //                 'empFormCsr': data[0][13].Emp_form_CSR,
    //                 'originalSubmitted': data[0][14].original_submitted
    //             });
    //             dbSave.save(function(err, data) {
    //                 if (err) {
    //                     cb(err, null);
    //                 } else {
    //                     cb(null, 'save data');
    //                 }
    //             });
    //         }
    //     });
    // } else {
    //     cb('Mobile not proper Format', null);
    // }
};

module.exports = new excel;
