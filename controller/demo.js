var express = require('express'),
    router = express.Router(),
     db=require('../database/db'),
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
    console.log("length1: " + d.length + "\n");//2
    console.log("length2: " + d[1].length + "\n");//12

    for (var i = 0; i <= d.length - 1; i++) {
        for (var j = 0; j <= d[i].length - 1; j++) {
            var dbSave = new db.userModel()
            dbSave.save(function(err,data){
                if(err){
                    res.send(err);
                }else{
                    res.send('successfully save');
                }
            })
        }
    }
    res.json({ edit: edit });
});

router.post('/otp', function(req, res) {
    var mobile = req.body.mobile;
    sms.otp(mobile, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

router.post('/verify',function(req,res){
    var data={
       mobile:req.body.mobile,
        otp:req.body.otp
    } 
    sms.verify(data,function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
})

router.post('outTime', function(req, res) {

});
 
module.exports = router;
