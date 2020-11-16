const { Schema } = require('mongoose');

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['user_message', 'system_message'],
    },
    text: String,

}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = MessageSchema;
