const { MessageModel } = require('chat-schemas');
const mongoose = require('mongoose');
const redisClient = require('../redisClient');

const saveMessage = async (message, { _id }) => {
    const newMessage = {
        _id: new mongoose.Types.ObjectId(),
        user: _id,
        text: message,
        type: 'user_message',
    };

    const saved = (await MessageModel.create(newMessage));
    await saved.save();
    const messageWithUser = await MessageModel.findById(saved._id).populate('user').exec();    
    return messageWithUser;
};
const saveServerMessage = async (message) => {
    const newMessage = {
        _id: new mongoose.Types.ObjectId(),
        text: message,
        type: 'system_message',
    };

    const saved = (await MessageModel.create(newMessage));
    await saved.save();
    return saved;
};

const getMessages = async () => {
    try{
        const messages = await MessageModel.find().populate('user').exec();
        return messages;
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    getMessages,
    saveMessage,
    saveServerMessage,
};

