var socket = io();

socket.on('connect', function () {
//    document.getElementById('socketConnection').innerHTML = "Connected to a server."
});

socket.on('disconnect', function () {

   document.getElementById('media-list').innerHTML += "Disconnected from the server."
});


socket.on('newMessage', function (message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('message-template').innerHTML;
    var html = Mustache.render(template, {text: message.text, from: message.from, createdAt: formattedTime});
    
    document.getElementById('media-list').innerHTML += html;
});

socket.on('newLocationMessage', function (message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('location-message-template').innerHTML;
    var html = Mustache.render(template, {from: message.from,  url: message.url, createdAt: formattedTime});
    
    document.getElementById('media-list').innerHTML += html;
});


$('#message-form').on('submit', function (e) {
    
    var messageTextbox =  $('#text-input'); //to save time
    
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
 });

var locationButton = $('#location');
locationButton.on('click', function () {

//    document.getElementById('modal-text').innerHTML = "Unfortunately, geolocation is not supported by your browser";
//        $("#my-modal").modal("show");
//    
    if(!navigator.geolocation){
        document.getElementById('modal-text').innerHTML = "Unfortunately, geolocation is not supported by your browser";
        $("#my-modal").modal("show");
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending Location');
   
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
        
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        document.getElementById('modal-text').innerHTML = "Unable to fetch your location.";
        $("#my-modal").modal("show");
    });
    
 });