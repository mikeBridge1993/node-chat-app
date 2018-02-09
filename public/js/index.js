var socket = io();

socket.on('room-list', function (list) {
    var dropdown = document.getElementById('btn-dropdown');
    var dropdownList = document.getElementById('rooms-dropdown');
    
    dropdownList.innerHTML = "";
    dropdown.classList.add("disabled");
    if(list.length == 0){
        dropdown.classList.add("disabled");
    } else {
        dropdown.classList.remove("disabled");
        
        list.forEach(function (el) {
           dropdownList.innerHTML += '<a class="dropdown-item">'+el+'</a>'
        });
    }
});

