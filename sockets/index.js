var socket = io('http://localhost:3000/');

socket.on('connected', (data) => {
    console.log(data)
})
socket.on('pong', (data) => {
    console.log(data)
})

socket.emit('hello', 'ping')