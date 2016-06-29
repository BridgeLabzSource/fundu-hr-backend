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

    var data = req.body.share.length();
    console.log(" length :"+data);
    res.json({ edit: edit });
});

router.post('/inTime', function(req, res) {

});

router.post('outTime', function(req, res) {

});

module.exports = router;
