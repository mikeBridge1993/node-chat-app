var socket = io();

socket.on('connect', function () {
//    document.getElementById('socketConnection').innerHTML = "Connected to a server."
});


socket.on('welcomeMessage', function (welcome) {
//   document.getElementById('socketConnection').innerHTML += "<br><span style='color:grey'> From: </span>" + welcome.from + " <br>" + "<span style='color:grey'> Content: </span>" + welcome.text + " <br>"
    document.getElementById('media-list').innerHTML +=
    '<li class="media">'+
    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
    '<div class="media-body">'+
    '<h5 class="mt-0 mb-1">'+welcome.from+'</h5>'+
    welcome.text+
    '</div>'+
    '</li>'
});

socket.on('disconnect', function () {
    document.getElementById('socketConnection').innerHTML = "Disconnected from the server."
});


socket.on('newMessage', function (message) {
   var date = new Date(message.createdAt)+"";
//    document.getElementById('socketConnection').innerHTML +=
//        '<br><div class="lead chat-message bg-light text-primary my-1 py-5 offset-4 col-4">'+ "New message received.<br>" + "From: " + message.from + " <br>" + "Content: " + message.text +  "<br>Created at: " + message.createdAt +"</div><br>";
    document.getElementById('media-list').innerHTML +=
    '<li class="media">'+
    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
    '<div class="media-body">'+
    '<h5 class="mt-0 mb-1">'+message.from+'</h5>'+
    '<h6 class="mt-0 mb-1">'+date.split('GMT')[0].substring(0, date.length - 3).slice(0, -4)+'</h6>'+
    message.text+
    '</div>'+
    '</li>'
    
    
});

socket.on('newLocationMessage', function (message) {
    document.getElementById('media-list').innerHTML +=
    '<li class="media">'+
    '<img class="d-flex" src="/img/user.png" alt="Generic placeholder image">'+
    '<div class="media-body">'+
    '<h5 class="mt-0 mb-1">'+message.from+'</h5>'+
    '<a target="_blank" href="' + message.url + "'" + ' class="mt-0 mb-1">My current location</a>'+
    '</div>'+
    '</li>'
});


$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('#text-input').val()
    }, function () {
    
    });
 });

$('#location').on('click', function () {

//    document.getElementById('modal-text').innerHTML = "Unfortunately, geolocation is not supported by your browser";
//        $("#my-modal").modal("show");
//    
    if(!navigator.geolocation){
        document.getElementById('modal-text').innerHTML = "Unfortunately, geolocation is not supported by your browser";
        $("#my-modal").modal("show");
    }
    
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
        
    }, function () {
        document.getElementById('modal-text').innerHTML = "Unable to fetch your location.";
        $("#my-modal").modal("show");
    });
    
 });