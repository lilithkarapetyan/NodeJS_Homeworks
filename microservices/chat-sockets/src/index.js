require('dotenv').config();

const uuid = require('uuid');
const axios = require('axios').default;
const http = require('http').createServer();
const io = require('socket.io')(http);
const socketioJwt = require('socketio-jwt');

const messages = [];
const participants = {};
io.sockets
  .on('connection', socketioJwt.authorize({
    secret: 'SECRET',
    timeout: 15000
  }))
  .on('authenticated', async (socket) => {
    try {
      const token = socket.encoded_token;
      const id = socket.decoded_token;
      const user = await axios.get('http://127.0.0.1:3001/api/users/me', {
        headers: {
          authorization: token
        }
      });

      const { user: { name } } = user && user.data;
      participants[id] = name;

      socket.emit('welcome', `Hello ${name}!`);
      socket.emit('messages', messages);

      socket.on('newMessage', message => {
        messages.push({
          id: uuid.v4(),
          createdAt: (new Date()).toLocaleTimeString(),
          user: {
            id,
            name,
          },
          message: {
            text: message,
            isDeleted: false,
          },
        });
        
        io.emit('messages', messages);
      })
    } catch (err) {
      console.log(err && err.response && err.response.data)
    }
  });


const PORT = process.env.PORT || 3002;
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
