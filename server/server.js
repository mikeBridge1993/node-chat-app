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
    
    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
    
});

server.listen(port, () => {
    console.log("Started up on port", port);
});
