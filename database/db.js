/**
 * define require module
 */
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
    "time": [{
        "inTime": { type: String },
        "outTime": { type: String },
        "totalTime": { type: String },
        "syncTime": { type: Date, default: Date.now() }
    }],

});
var demo = mongoose.model('demo', demo, 'demo');
exports.demo = demo;

var userAttendance = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'demo'
    },
    time: [{
        inTime: String,
        outTime: String,
        totalTime: String
    }]
});
var userAttendance = mongoose.model("userAttendance", userAttendance, "userAttendance");
exports.userAttendance = userAttendance;
