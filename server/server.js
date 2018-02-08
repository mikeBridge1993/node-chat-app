const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log("Client connected");

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required.');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room), params.room);
        socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit('newMessage',  generateMessage("Admin", "One user joined the session"));
        callback();
        
    });
    
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude)); 
        }
        
    });
    
    socket.on('createMessage', (message,  callback) => {
        var user = users.getUser(socket.id);
        
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
        }
        
//        io.emit('newMessage', generateMessage(message.from, message.text)); //send message created by a specific user, back to all the users connected
        callback('This is from the Server'); //runs the function passed as argument by the user i.e. acknowledgment
     });   
    
    socket.on('disconnect', function () { 
        var user = users.removeUser(socket.id);
       
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room), user.room);
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + " has left the session."));
        }
    });

});

server.listen(port, () => {
    console.log("Started up on port", port);
});
