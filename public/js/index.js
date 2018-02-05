var socket = io();
socket.on('connect', function () {
    document.getElementById('socketConnection').innerHTML = "Connected to a server."
    
    
//    socket.emit('createMessage', {
//      message: document.getElementById('email-input').value,
//      text: document.getElementById('text-input').value
//    });

});

socket.on('disconnect', function () {
    document.getElementById('socketConnection').innerHTML = "Disconnected from the server."
});

//socket.on('newEmail', function (email) {
//    document.getElementById('socketConnection').innerHTML = "New Email received.<br>" + "From: " + email.from + " <br>" + "Content: " + email.text + " <br>"
//});
//
//socket.emit('createEmail', {
//  email: document.getElementById('email-input').value,
//  text: document.getElementById('text-input').value
//});

socket.on('newMessage', function (message) {
    document.getElementById('socketConnection').innerHTML = document.getElementById('socketConnection').innerHTML +
        '<br><div class="lead chat-message bg-info text-light my-1 py-5 offset-4 col-4">'+ "New message received.<br>" + "From: " + message.from + " <br>" + "Content: " + message.text + "</div><br>";       
});

