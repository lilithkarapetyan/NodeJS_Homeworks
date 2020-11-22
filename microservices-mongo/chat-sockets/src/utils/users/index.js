const config = require('../../../config');
const axios = require('axios').default;
const socketioJwt = require('socketio-jwt');

const users = {};

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

const registerUser = ({ _id, firstName, lastName }) => {
    users[_id] = `${firstName} ${lastName}`;
};

const authorize = () => {
    return socketioJwt.authorize({
        secret: process.env.JWT_SECRET || config.user.auth.JWT_SECRET,
        timeout: config.user.auth.timeout
    })
};

module.exports = {
    authorize,
    getUserInfo,
    registerUser,
};
