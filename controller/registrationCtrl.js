'use strict';
/**
 * define require module
 */
let express = require('express'),
    router = express.Router(),
    reg = require('../model/registration');

router.post('/', function(req, res) {
    let data = {
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        repassword: req.body.repassword
    };
    reg.register(data, function(err, result) {
        if (err) {
            res.json({ 'err': err });
        } else {
            res.json({ 'data': result });
        }
    });
});

router.post('/login', function(req, res) {
    let data = {
        mobile: req.body.mobile,
        password: req.body.password
    };
    reg.login(data, function(err, result) {
        if (err) {
            res.json({ 'err': err });
        } else {
            res.json({ 'data': result });
        }
    });
});
module.exports = router;
