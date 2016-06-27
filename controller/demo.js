var express = require('express'),
    router = express.Router(),
   request=require('request'),
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
	var url='https://docs.google.com/spreadsheets/d/1aEqcILF2pbyHAiT5EKFq-plh903XcM9-Gtur8a2t_Es/edit#gid=1992094472';
	request(url,function(data){
		res.send(data);
	})
});

router.post('/inTime',function(req,res){

});

router.post('outTime',function(req,res){

});

module.exports = router;
