/**
 * @define dependencies
 */
var express = require('express')
app = express(),
    port = process.env.PORT || 3010,
    bodyParser = require('body-parser');
/**
 * configure 
 */
app.use(bodyParser());
app.use(require('./controller/demo'));

/**
 * listen port
 */
app.listen(port, function() {
    console.log("Server Runnig");
})
