var socket = io();

socket.on('connect', function () {
//    document.getElementById('socketConnection').innerHTML = "Connected to a server."
});


//socket.on('welcomeMessage', function (welcome) {
////   document.getElementById('socketConnection').innerHTML += "<br><span style='color:grey'> From: </span>" + welcome.from + " <br>" + "<span style='color:grey'> Content: </span>" + welcome.text + " <br>"
//    document.getElementById('media-list').innerHTML +=
//    '<li class="media mt-1 pt-4">'+
//    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
//    '<div class="media-body">'+
//    '<h5 class="mt-0 mb-1">'+welcome.from+'</h5>'+
//    welcome.text+
//    '</div>'+
//    '</li>'
//});

socket.on('disconnect', function () {

   document.getElementById('media-list').innerHTML += "Disconnected from the server."
});


socket.on('newMessage', function (message) {
//   var date = new Date(message.createdAt)+"";
   var formattedTime = moment(message.createdAt).format('h:mm a');
//   date.split('GMT')[0].substring(0, date.length - 3).slice(0, -4)
//    document.getElementById('socketConnection').innerHTML +=
//        '<br><div class="lead chat-message bg-light text-primary my-1 py-5 offset-4 col-4">'+ "New message received.<br>" + "From: " + message.from + " <br>" + "Content: " + message.text +  "<br>Created at: " + message.createdAt +"</div><br>";
    document.getElementById('media-list').innerHTML +=
    '<li class="media mt-1 pt-4 mb-1 py-0">'+
    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
    '<div class="media-body">'+
    '<h5 class="mt-0 mb-1">'+message.from+'</h5>'+
    '<h6 class="mt-0 mb-1">'+formattedTime+'</h6>'+
    message.text+
    '</div>'+
    '</li>'
    
    
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    
    document.getElementById('media-list').innerHTML +=
    '<li class="media mt-1 pt-4">'+
    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
    '<div class="media-body">'+
    '<h5 class="mt-0 mb-1">'+message.from+'</h5>'+
    '<h6 class="mt-0 mb-1">'+formattedTime+'</h6>'+
    '<a target="_blank" href="' + message.url + "'" + ' class="mt-0 mb-1">My current location</a>'+
    '</div>'+
    '</li>'
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