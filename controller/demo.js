var express = require('express'),
    router = express.Router(),
    db = require('../database/db'),
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
    console.log(d[1][0])
    console.log("length1: " + d.length + "\n"); //2
    console.log("length2: " + d[1].length + "\n"); //12

    for (var i = 0; i <= d.length - 1; i++) {
        db.userModel.findOne({ "Mobile": d[i][6].Mobile }, function(err, existingUser) {
            if (!existingUser) {
                // var data = JSON.stringify(d[i]);
                var dbSave = new db.userModel({
                    "sr_id": data[i][1],
                    "empId": data[i][1],
                    "empName": data[i][2],
                    "Designation": data[i][3],
                    "BL_start_date": data[i][4],
                    "End_Date": data[i][5],
                    "Mobile": data[i][6],
                    "PAN_card": data[i][7],
                    "Emp_contract_signed": data[i][8],
                    "offer_letter": data[i][9],
                    "Emp_form_CSR": data[i][10],
                    "original_submitted": data[i][11]
                });
                dbSave.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('successfully save');
                    }
                });
            }else{console.log('already exit')}
        });
    }
    res.json({ edit: 'update data' });
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
