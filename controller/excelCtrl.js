var express = require('express'),
    router = express.Router(),
    excel = require('../model/excel');

/**
 * save spreadsheet data into mongodb
 * @param {share}
 * @return {json}
 */
router.post('/', function(req, res) {
    var d = req.body.share;
    console.log(JSON.stringify(d));
    excel.save(d, function(err, data) {
        if (err) {
            res.json({ 'error': err, 'status': false });
        } else {
            res.json({ 'data': data, 'status': true });
        }
    })
});

module.exports=router;
