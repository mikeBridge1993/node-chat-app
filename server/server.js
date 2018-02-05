const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
//
//app.get('/', (req, res) => {
////    res.sendFile(path.join(__dirname, '../public/index.html'));
//});

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log("Client connected");
    
//    socket.emit('newEmail', {
//        from: "carlitos@leaseans-flyseans.com",
//        text: "Hey dude, Call me ASAP regarding the ACM and the fuel nozzles"
//    });
//    
//    socket.on('createEmail', (email) => {
//        console.log("Create Email", email);
//    });
    
    socket.emit('newMessage', {
        from: "carlitos@leaseans-flyseans.com",
        text: "Hey dude, Call me ASAP regarding the ACM and the fuel nozzles",
        createdAt: 123
    });
    
    socket.on('createMessage', (message) => {
        console.log("Create message", message);
    });
    
    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
    
    
    
});

server.listen(port, () => {
    console.log("Started up on port", port);
});
