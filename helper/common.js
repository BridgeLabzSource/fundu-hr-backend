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
    },
    witRequest: function(messages) {
        console.log(messages)
        var url = process.env.witUrl || 'https://api.wit.ai/message?v=20160526&q=' + messages,
            auth = process.env.witAuthToken || 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
        request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
            console.log(body.length);
            // if (body.entities.datetime[0].value == undefined) {
            //     console.log("true");
            //     var data = {
            //         "intent": body.entities.intent[0].value,
            //         "on_off": body.entities.on_off[0].value,
            //         "datetime": moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss Z")
            //     };
            //     console.log(data)
            //     return data
            // }else{
            //     console.log("false");
            //     var data={
            //         "intent": body.entities.intent[0].value,
            //         "on_off": body.entities.on_off[0].value,
            //         "datetime": body.entities.datetime[0].value
            //     }
            // }
            // return data;
        })

    }
}
