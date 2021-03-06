var socket = io();

function scrollToBottom () {
   
    var messages = $('#media-list');
    var newMessage = messages.children('li:last-child');
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    
//    messages.scrollTop(scrollHeight);
    if(clientHeight + scrollTop + newMessageHeight >= scrollHeight - newMessageHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    params.room = params.room.toLowerCase();
    socket.emit('join', params, function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('updateUserList', function (list, room) {
    document.getElementById('room-name').innerHTML = room;
    
    document.getElementById('users-list').innerHTML ="";
    list.forEach(function (el) {
       document.getElementById('users-list').innerHTML += '<li>'+el+'</li><br>'
    });
    
//    //Get list of all the rooms that are currently being used, to update dropdown menu on join page
//    document.getElementById('rooms-dropdown').innerHTML ="";
//    list.forEach(function (el) {
//       document.getElementById('rooms-dropdown').innerHTML += '<a class="dropdown-item">'+el.room+'</a><br>'
//    });
});

socket.on('disconnect', function () { 
//   document.getElementById('media-list').innerHTML += "Disconnected from the server."
});


socket.on('newMessage', function (message) {  
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('message-template').innerHTML;
    var html = Mustache.render(template, {text: message.text, from: message.from, createdAt: formattedTime, color: message.color});
    
    document.getElementById('media-list').innerHTML += html;
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('location-message-template').innerHTML;
    var html = Mustache.render(template, {from: message.from,  url: message.url, createdAt: formattedTime});
    
    document.getElementById('media-list').innerHTML += html;
    scrollToBottom();
});


$('#message-form').on('submit', function (e) {
    
    var messageTextbox =  $('#text-input'); //to save time
    
    e.preventDefault();
    socket.emit('createMessage', {
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