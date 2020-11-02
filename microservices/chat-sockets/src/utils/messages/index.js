const uuid = require('uuid');

const messages = [];

const saveMessage = (message, { id, name }) => {
    const newMessage = {
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

