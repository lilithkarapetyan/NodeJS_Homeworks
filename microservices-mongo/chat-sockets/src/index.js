require('dotenv').config();

const http = require('http').createServer();
const io = require('socket.io')(http);

const {
  authorize,
  getUserInfo,
  registerUser,
} = require('./utils/users');

const {
  getMessages,
  saveMessage,
} = require('./utils/messages');

const server = {
  id: "",
  firstName: "",
  lastName: "",
}

io.sockets
  .on('connection', authorize())
  .on('authenticated', async (socket) => {
    try {
      const userInfo = await getUserInfo(socket);
      const user = userInfo.data.user;
      registerUser(user)
      console.log(user);
      socket.broadcast.emit('serverMessage', saveMessage(`${user.firstName} ${user.lastName} entered the chat`, server ));
      socket.emit('messages', getMessages());

      socket.on('newMessage', message => {
        const newMessage = saveMessage(message, user);
        io.emit('newMessage', newMessage);
      })

      socket.on('disconnect', () => {
        const newMessage = saveMessage(`${user.firstName} ${user.lastName} left the chat`, server);
        socket.broadcast.emit('newMessage', newMessage);
      })

    } catch (err) {
      console.log(err);
    }
  })
  .on('unauthenticated', async (socket) => {
    socket.emit('unauthenticated', 'Please, log in to continue');
  });


const PORT = process.env.PORT || 3002;
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
