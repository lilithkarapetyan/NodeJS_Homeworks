require('dotenv').config({ path: `${__dirname}/.env` });
const http = require('http').createServer();
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const redisClient = require('./utils/redisClient');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DBURL);

const {
  authorize,
  getUserInfo,
  sendActiveUsersUpdate,
} = require('./utils/users');

const {
  getMessages,
  saveMessage,
  saveServerMessage,
} = require('./utils/messages');

redisClient.del('activeUsers', (err, isOk) => console.log(err, isOk));
io.sockets
  .on('connection', authorize())
  .on('authenticated', async (socket) => {
    try {
      const userInfo = await getUserInfo(socket);
      const user = userInfo.data.user;

      redisClient.lpush('activeUsers', JSON.stringify(user), (err, isOk) => !err && sendActiveUsersUpdate(io));

      const allMessages = await getMessages();
      socket.emit('messages', allMessages);
      const enterMessage = await saveServerMessage(`${user.firstName} ${user.lastName} entered the chat`);
      io.emit('newMessage', enterMessage);

      socket.on('newMessage', async message => {
        const newMessage = await saveMessage(message, user);
        io.emit('newMessage', newMessage);
      })

      socket.on('disconnect', async () => {
        const leaveMessage = await saveServerMessage(`${user.firstName} ${user.lastName} left the chat`);
        socket.broadcast.emit('newMessage', leaveMessage);
        redisClient.lrem('activeUsers', 0, JSON.stringify(user), (err, isOk) => !err && sendActiveUsersUpdate(io));
      })

    } catch (err) {
      console.log(err);
    }
  })
  .on('unauthenticated', async (socket) => {
    socket.emit('unauthenticated', 'Please, log in to continue');
  });

redisClient.on("error", function (error) {
  console.error(error);
});

const PORT = process.env.PORT || 3002;
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
