const uuid = require('uuid');

const messages = [];

const saveMessage = (message, { _id, firstName, lastName }) => {
    const newMessage = {
        id: uuid.v4(),
        createdAt: (new Date()).toLocaleTimeString(),
        user: {
            _id,
            firstName,
            lastName,
        },
        message: {
            text: message,
            isDeleted: false,
        },
    }
    console.log("saved", message)
    messages.push(newMessage);
    return newMessage;
};

const getMessages = () => {
    return messages;
};

module.exports = {
    getMessages,
    saveMessage,
};

