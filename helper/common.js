module.exports = {
    isMobile: function(mobile) {
        if (mobile.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/)) {
            return true
        } else {
            return false
        }
    },
    sendOtp:function(mobile){
    	var request=require("request");
    	var otp = (Math.floor(Math.random() * 90000) + 10000);
    var url="https://5773bbfd5428410009000000:293f229133f20f57fd09193a8436c7a8@api.easysmsapp.com/accounts/5773bbfd5428410009000000/messages";
    request.post(url,{form:{"to":mobile,"body":"your otp is "+otp}}, function(ee, r, body){
        // console.log(ee);
        console.log("r :"+r);
        console.log("body :"+body);
    });
    }
}
