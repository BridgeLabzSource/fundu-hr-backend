/**
 * @exports {isMobile,sendOtp}
 */
module.exports = {
    isMobile: function(mobile) {
        if (mobile.match(/^(\+91[\s]?)\d{10}$/)) {
            return true;
        } else {
            return false;
        }
    },
    sendOtp: function(mobile, otp) {
        var request = require("request");
        var url = process.env.smsUrl || "https://5773bbfd5428410009000000:293f229133f20f57fd09193a8436c7a8@api.easysmsapp.com/accounts/5773bbfd5428410009000000/messages";
        request.post(url, { form: { "to": mobile, "body": "your otp is : " + otp } }, function(ee, r, body) {
            return body;
        });
    }
}
