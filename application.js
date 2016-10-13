$(document).ready(function(){
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('player count', function(msg){
    $('#loadPlayer').text(msg)
    $('.playerStatus').show()
  })

  $('.player1').on('click', function(){
    var name = $('#name').val();
    if (name != ""){
      socket.emit("join", name);
    }
  })

})

var getName = function(){
  var name = prompt("What's your name?")
  $('.player1').text(name)
  return name
}
