var socket = io();

socket.on('connect', function () {
    document.getElementById('socketConnection').innerHTML = "Connected to a server."
});


socket.on('welcomeMessage', function (welcome) {
    document.getElementById('socketConnection').innerHTML += "<br><span style='color:grey'> From: </span>" + welcome.from + " <br>" + "<span style='color:grey'> Content: </span>" + welcome.text + " <br>"
});

socket.on('disconnect', function () {
    document.getElementById('socketConnection').innerHTML = "Disconnected from the server."
});


socket.on('newMessage', function (message) {
    document.getElementById('socketConnection').innerHTML +=
        '<br><div class="lead chat-message bg-light text-primary my-1 py-5 offset-4 col-4">'+ "New message received.<br>" + "From: " + message.from + " <br>" + "Content: " + message.text +  "<br>Created at: " + message.createdAt +"</div><br>";       
});


$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('#text-input').val()
    }, function () {
    
    });
 });