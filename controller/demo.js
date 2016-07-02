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
        console.log("mobile "+d[i][7].Mobile);
        db.userModel.findOne({ "Mobile": d[i][7].Mobile }, function(err, existingUser) {
            // console.log("existingUser: "+existingUser+" and "+d[i][7].Mobile);
            if (!existingUser) {
                // var data = JSON.stringify(d[i]);
                var dbSave = new db.userModel({
                    "sr_id": d[i][0],
                    "empId": d[i][1],
                    "empName": d[i][2],
                    "Designation": d[i][3],
                    "BL_start_date": d[i][4],
                    "start_date_at_company":d[i][5],
                    "End_Date": d[i][6],
                    "Mobile": d[i][7],
                    "PAN_card": d[i][8],
                    "email":d[i][9],
                    "DOB":d[i][10],
                    "Emp_contract_signed": d[i][11],
                    "offer_letter": d[i][12],
                    "Emp_form_CSR": d[i][13],
                    "original_submitted": d[i][14]
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
