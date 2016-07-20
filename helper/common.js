/**
 * @exports {isMobile,sendOtp}
 */
var request = require("request"),
    moment = require('moment');
module.exports = {
    isMobile: function(mobile) {
        if (mobile.match(/^(\+91[\s]?)\d{10}$/)) {
            return true;
        } else {
            return false;
        }
    },
    sendOtp: function(mobile, otp) {
        var url = process.env.smsUrl+"/messages";
        request.post(url, { form: { "to": mobile, "body": "your otp is : " + otp } }, function(ee, r, body) {
            return body;
        });
    }
}
