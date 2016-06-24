var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.send('hiiiii');
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    res.send('your message is :'+message);
});

router.post('/edit',function(req,res){
	var edit=req.body.edit;
	edit='chandan';
	res.send(edit);
})

module.exports = router;
