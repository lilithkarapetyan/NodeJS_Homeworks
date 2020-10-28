const path = require('path');
const express = require('express');
const app = express();
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connect', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 3002;
http.listen(process.env.PORT || PORT, () => {
    console.log('listening on *:3002');
});