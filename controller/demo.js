var express = require('express'),
    router = express.Router(),
    db = require('../database/db');

router.get('/', function(req, res) {
    res.send('hiiiii');
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    console.log(message);
    res.json({ message: message });
});

router.post('/edit', function(req, res) {
    var edit = req.body.PAN_card;
    console.log(" Data:  " + JSON.stringify(req.body) + "\n");
    var d=req.body.share;
    console.log("length1: "+d.length+"\n");
    console.log("length2: "+d[1].length+"\n");


    for(var i=0;i<=d.length-1;i++){
    	for(var j=0;j<=d[i].length-1;j++){
    		console.log("data"+j+" :"+JSON.stringify(d[i][j]));
    	}
    }
    var data = req.body.share[0][2].empName;
    console.log(" empName :"+data);
    res.json({ edit: edit });
});

router.post('/inTime', function(req, res) {

});

router.post('outTime', function(req, res) {

});

module.exports = router;
