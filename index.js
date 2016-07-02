/**
 * @define dependencies
 */
var express = require('express')
app = express(),
    port = process.env.PORT||3006,
    bodyParser = require('body-parser'),
    db = require('./model/connect.js');
/**
 * configure 
 */
app.use(bodyParser());
app.use(require('./controller/demo'));

/**
 * listen port
 */
db.connect(function() {
    app.listen(port, function() {
        console.log("Server Runnig " + port);
    })
})
