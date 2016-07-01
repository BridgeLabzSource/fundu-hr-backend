var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    sr_id: { type: Number },
    empId: { type: Number },
    empName: { type: String },
    Designation: { type: String },
    BL_start_date: { type: Date },
    End_Date: { type: Date },
    Mobile: { type: String },
    PAN_card: { type: String },
    Emp_contract_signed: { type: String },
    offer_letter: { type: String },
    Emp_form_CSR: { type: String },
    original_submitted: { type: String }
});

var userModel = mongoose.model('userSchema', userSchema, 'userModel');
exports.userModel = userModel;

var demo=mongoose.Schema({
    mobile:{type:String},
    otp:{type:String},
    syncTime:{type:Date,default:Date.now()}
});
var demo=mongoose.model('demo',demo,'demo');
exports.demo=demo;

