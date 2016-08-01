/**
 * define require module
 */
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    'srId': { type: Number },
    'empId': { type: String },
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
    'originalSubmitted': { type: String },
    'password': { type: String },
    'otp': { type: String },
    'time': [{
        'inTime': { type: String },
        'outTime': { type: String },
        'totalTime': { type: String },
        'syncTime': { type: Date, default: Date.now() }
    }]
});

let userModel = mongoose.model('userModel', userSchema, 'userModel');
exports.userModel = userModel;

let errorSchema = mongoose.Schema({
    'message': { type: String },
    'response': { type: String },
    'Date': { type: Date, default: Date.now() }
})
let errorMsg = mongoose.model('errorMsg', errorSchema, 'errorMsg');
exports.errorMsg = errorMsg;

//  let AttendanceSchema = mongoose.Schema({
//     'mobile': { type: Schema.Types.mobile, ref: 'userModel' },
//     'time': [{
//         'inTime': { type: String },
//         'outTime': { type: String },
//         'totalTime': { type: String },
//         'syncTime': { type: Date, default: Date.now() }
//     }]
// })

// let Attendance = mongoose.model('Attendance', AttendanceSchema, 'Attendance');
// exports.Attendance = Attendance;
