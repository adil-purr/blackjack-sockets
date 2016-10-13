$(document).ready(function(){
  var socket = io();
  $('form').submit(function(){
    socket.emit('send', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });



  socket.on('player count', function(msg){
    $('#playercount').text(msg)
  })

  $('.player1').on('click', function(){
    var name = $('#name').val();
    if (name != ""){
      socket.emit("join", name);
      $('.player1').text(name)
      socket.emit('update-player-count');
      $('.name_input').hide()
    }
  })
  socket.on('chat', function(msg, who){
    $('#messages').append($('<li>').text(msg + ': ' + who))
  })

  socket.on('update-name', function(msg){
    $('#messages').append('<li><strong>' + msg + ' has joined the channel</strong></li>')

  })

})

var getName = function(){
  var name = prompt("What's your name?")
  $('.player1').text(name)
  return name
}
