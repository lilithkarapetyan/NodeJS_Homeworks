const config = require('../../../config');
const axios = require('axios').default;
const socketioJwt = require('socketio-jwt');
const redisClient = require('../redisClient');

const getUserInfo = async (socket) => {
    const token = socket.encoded_token;
    const id = socket.decoded_token;
    const user = await axios.get(config.user.infoURL, {
        headers: {
            authorization: token
        }
    });
    return user;
};

const authorize = () => {
    return socketioJwt.authorize({
        secret: process.env.JWT_SECRET || config.user.auth.JWT_SECRET,
        timeout: config.user.auth.timeout
    })
};

const sendActiveUsersUpdate = (io) => {
    redisClient.lrange('activeUsers', 0, -1, (err, data) =>{
        console.log(err)
        if(err || !data || !Array.isArray(data)) return;
        io.emit('onlineUsers', data.map(item => JSON.parse(item)));
    })
}

module.exports = {
    authorize,
    getUserInfo,
    sendActiveUsersUpdate,
};
