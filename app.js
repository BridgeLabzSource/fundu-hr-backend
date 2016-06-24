/**
 * @define dependencies
 */
var express = require('express')
app = express(),
    port = process.env.PORT || 3007,
    bodyParser = require('body-parser');
/**
 * configure 
 */
app.use(bodyParser());
app.use(require('./controller/index'));

/**
 * listen port
 */
app.listen(port, function() {
    console.log("Server Runnig");
})
