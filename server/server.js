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

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log("Client connected");
    
    socket.emit('welcomeMessage', generateMessage("Admin", "Welcome to the chat app"));
    
    socket.broadcast.emit('welcomeMessage',  generateMessage("Admin", "One user joined the session"));
    
    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    
    socket.on('createMessage', (message,  callback) => {
        console.log("Create message", message);
        io.emit('newMessage', generateMessage(message.from, message.text)); //send message created by a specific user, back to all the users connected
        callback('This is from the Server'); //runs the function passed as argument by the user i.e. acknowledgment
     });   
    
    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });

});

server.listen(port, () => {
    console.log("Started up on port", port);
});
