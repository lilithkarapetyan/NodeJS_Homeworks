const mongoose = require('mongoose');
const { UserSchema, MessageSchema } = require('./schemas');

const UserModel = mongoose.model('User', UserSchema);
const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = {
    UserModel,
    MessageModel,
};
