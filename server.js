'use strict';

var express = require('express'),
    app = express();
var kiss = require('kiss.io');

/**
 *
 */
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**
 *
 */
var io = kiss().of('/');

//io.set('transports', [process.env.LATENCY_TRANSPORT || 'xhr-polling']);
io.on('connection', function(socket)
{
  console.log(socket.id);

  socket.on('Ping', function(pingTime)
  {
    var msLatency = Date.now() - pingTime;

    socket.emit('Pong', msLatency);
  });
});

kiss()
.attach(app)
.listen(3000, function()
{
  console.log('started');
});