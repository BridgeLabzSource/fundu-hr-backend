var express = require('express'),
    router = express.Router(),
    request = require('request'),
    sms = require('../model/sms');

router.get('/', function(req, res) {
    res.send('hiiiii');
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    console.log(message);
    res.json({ message: message });
});

router.post('/edit', function(req, res) {
    var d = req.body.share;
    sms.save(d, function(err, data) {
        if (err) {
            res.json({ "error": err, "status": false });
        } else {
            res.json({ "data": data, "status": true });
        }
    })
});

router.post('/otp', function(req, res) {
    var mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.json({ "error": err, "status": false });
        } else {
            res.json({ "data": data, "status": true });
        }
    })
});

router.post('/verify', function(req, res) {
    var data = {
        mobile: req.body.mobile,
        otp: req.body.otp
    }
    sms.verify(data, function(err, data) {
        if (err) {
            res.json({ "error": err, "status": false });
        } else {
            res.json({ "data": data, "status": true });
        }
    })
})

router.post('/wit', function(req, res) {
    var message = req.body.message;
    var url = 'https://api.wit.ai/message?v=20160526&q=' + message;
    var auth = 'Bearer S2VQWSMBFF6BE4NSJICC26BL75BALYVD'
    request({ url: url, method: 'POST', json: true, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } }, function(ee, r, body) {
        res.send("body" + JSON.stringify(r.body));
    })
});
request.post
module.exports = router;
