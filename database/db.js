var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "srId": { type: Number },
    "empId": { type: Number },
    "empName": { type: String },
    "designation": { type: String },
    "blStartDate": { type: Date },
    "startDateAtCompany": { type: Date },
    "endDate": { type: Date },
    "mobile": { type: String },
    "panCard": { type: String },
    "email": { type: String },
    "dob": { type: Date },
    "empContractSigned": { type: String },
    "offerLetter": { type: String },
    "empFormCsr": { type: String },
    "originalSubmitted": { type: String }
});

var userModel = mongoose.model('userSchema', userSchema, 'userModel');
exports.userModel = userModel;

var demo = mongoose.Schema({
    "mobile": { type: String },
    "otp": { type: String },
    "inTime": { type: Date },
    "outTime": { type: Date },
    "syncTime": { type: Date, default: Date.now() }
});
var demo = mongoose.model('demo', demo, 'demo');
exports.demo = demo;
