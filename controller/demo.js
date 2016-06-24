var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.send('hiiiii');
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    res.send('your message is :'+message);

})

module.exports = router;
