var express = require('express'),
    router = express.Router(),
    db = require('../database/db'),
    request=require('request'),
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
        for (var j = 0; j <= d[i].length - 1; j++) {
            db.userModel.findOne({ "Mobile": d[i][j].Mobile }, function(err, existingUser) {
                if (!existingUser) {
                    var data = JSON.stringify(d[i]);
                    var dbSave = new db.userModel(data);
                    dbSave.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('successfully save');
                        }
                    });
                    // break;
                }
            });
        }

    }
    res.json({ edit: 'update data' });
});

router.post('/otp', function(req, res) {
    var mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.json({"error":err,"status":"false"});
        } else {
            res.json({"data":data,"status":"true"});
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
            res.json({"error":err,"status":"false"});
        } else {
            res.json({"data":data,"status":"true"});
        }
    })
})

router.post('/wit', function(req, res) {
    var message=req.body.message;
    var url='https://api.wit.ai/message';
    request(url,{data:{'q':message,'access_token' : S2VQWSMBFF6BE4NSJICC26BL75BALYVD
}})

});

module.exports = router;
