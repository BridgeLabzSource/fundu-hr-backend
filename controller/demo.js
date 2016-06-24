var express = require('express'),
    router = express.Router();

router.get('/get', function(req, res) {
    var msg = req.query.q;
    res.send('your message is :' + msg);
});

router.post('/sendmsg', function(req, res) {
    var message = req.body.message;
    res.send('your message is :'+message);

})

module.exports = router;
