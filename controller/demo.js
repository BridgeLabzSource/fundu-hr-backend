var express = require('express'),
    router = express.Router(),
    db=require('../database/db');

router.get('/', function(req, res) {
    res.send('hiiiii');
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    console.log(message);
    res.json({message:message});
});

router.post('/edit',function(req,res){
	var edit=req.body.edit;
	console.log(edit.sr_id);
	res.send(edit.sr_id);
});

router.post('/inTime',function(req,res){

});

router.post('outTime',function(req,res){

});

module.exports = router;
