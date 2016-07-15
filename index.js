/**
 * @define dependencies
 */
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    port = process.env.PORT || 3009,
    bodyParser = require('body-parser'),
    cors = require('cors'),
    io = require('socket.io')(server);
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
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

db.connect(function() {
    server.listen(port, function() {
        console.log("Server Runnig " + port);
    })
})
