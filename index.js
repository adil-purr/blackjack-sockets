var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {}

app.get('/', function(req, res){
  res.sendFile( __dirname+'/index.html');
});

app.use(express.static(__dirname))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

io.on('connection', function(socket){
  socket.on('update-player-count', function(){
    io.sockets.emit('player count', io.engine.clientsCount)
  })

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('join', function(name){
    players[socket.id] = name;
    io.sockets.emit('update-name', name)
  })



  socket.on('send', function(msg){
    io.sockets.emit('chat',players[socket.id], msg);

  })
});





http.listen(3000, function(){
  console.log('listening on *:3000');
});
