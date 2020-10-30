const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketioJwt = require('socketio-jwt');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// io.on('connect', socket => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: 'SECRET',
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    socket.emit('welcome', `Hello! ${socket.decoded_token}`);
  });


const PORT = 3002;
http.listen(process.env.PORT || PORT, () => {
    console.log('listening on *:3002');
});