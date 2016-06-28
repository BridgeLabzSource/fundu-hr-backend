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
	var edit=req.body.PAN_card;
	console.log("Data:  "+req.body+"\n");
	console.log("index[0] "req.body[0])
	res.json({edit:edit});
	// var data=new db.userModel(edit);
	// data.save(function(err,result){
	// 	if(err){
	// 		res.send(err);
	// 	}else{
	// 		res.send("respone: "+result);
	// 	}
	// })
});

router.post('/inTime',function(req,res){

});

router.post('outTime',function(req,res){

});

module.exports = router;
