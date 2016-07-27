/**
 * @exports {isMobile,sendOtp}
 */
var request = require('request'),
    db = require('../database/db'),
    moment = require('moment');
module.exports = {
    isMobile: function(mobile) {
        if (mobile.match(/^(\+91[\s]?)\d{10}$/)) {
            return true;
        } else {
            return false;
        }
    },
    isEmail: function(email) {
        if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
            return true
        } else {
            return false
        }
    },
    sendOtp: function(mobile, otp) {
        var url = process.env.smsUrl + '/messages';
        request.post(url, { form: { 'to': mobile, 'body': 'your otp is : ' + otp } }, function(ee, r, body) {
            return body;
        });
    },
    find: function(data) {
        console.log("inside common :"+data)
        db.userModel.findOne({ 'empId': data }, function(err, exist) {
            if (err) {
                return err;
            } else {
                return exist
            }
        })
    }
}
