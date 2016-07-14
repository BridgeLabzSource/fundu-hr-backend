/**
 * @define dependencies
 */
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3008,
    bodyParser = require('body-parser'),
    cors = require('cors'),
    db = require('./helper/connect.js');
/**
 * configure 
 */
app.use(cors());
app.use(bodyParser());
app.use(require('./controller/index'));

/**
 * listen port
 */
db.connect(function() {
    app.listen(port, function() {
        console.log("Server Runnig " + port);
    })
})
