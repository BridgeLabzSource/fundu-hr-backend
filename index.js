/**
 * @define dependencies
 */
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    port = process.env.PORT || 3012,
    bodyParser = require('body-parser'),
    cors = require('cors'),
    io = require('socket.io')(http),
    db = require('./helper/connect.js');
/**
 * configure 
 */
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(require('./controller/index'));

/**
 * socket connection on
 */
io.on('connection', function(socket) {
    console.log('a user connected to server');

    socket.on('message', function(message) {
        console.log('my message is : ' + message);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected from server');
    });
});

/**
 * listen port
 */
db.connect(function() {
    http.listen(port, function() {
        console.log("Server Runnig " + port);
    })
})
