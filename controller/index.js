var express = require('express'),
    router = express.Router();

router.post('/post', function(req, res) {
    var msg = req.query.q;
    res.send('your message is :' + msg);
});

module.exports = router;
