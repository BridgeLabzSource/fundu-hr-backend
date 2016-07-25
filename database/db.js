/**
 * define require module
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    'srId': { type: Number },
    'empId': { type: Number },
    'empName': { type: String },
    'designation': { type: String },
    'blStartDate': { type: Date },
    'startDateAtCompany': { type: Date },
    'endDate': { type: Date },
    'mobile': { type: String },
    'panCard': { type: String },
    'email': { type: String },
    'dob': { type: Date },
    'empContractSigned': { type: String },
    'offerLetter': { type: String },
    'empFormCsr': { type: String },
    'originalSubmitted': { type: String }
});

var userModel = mongoose.model('userSchema', userSchema, 'userModel');
exports.userModel = userModel;

var demo = mongoose.Schema({
    'email':{type:String,index: { unique: true }},
    'mobile': { type: String ,index: { unique: true }},
    'password':{type:String},
    'otp': { type: String },
    'time': [{
        'inTime': { type: String },
        'outTime': { type: String },
        'totalTime': { type: String },
        'syncTime': { type: Date, default: Date.now() }
    }],

});
var demo = mongoose.model('demo', demo, 'demo');
exports.demo = demo;

var errorMsg = mongoose.Schema({
    'message': { type: String },
    'response': { type: String },
    'Date': { type: Date, default: Date.now() }
})
var errorMsg = mongoose.model('errorMsg', errorMsg, 'errorMsg');
exports.errorMsg = errorMsg;
