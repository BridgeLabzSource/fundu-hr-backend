'use strict';
/**
 * @exports {isMobile,sendOtp}
 */
let request = require('request'),
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
        let url = process.env.smsUrl + '/messages';
        request.post(url, { form: { 'to': mobile, 'body': 'your otp is : ' + otp } }, function(ee, r, body) {
            return body;
        });
    }
}