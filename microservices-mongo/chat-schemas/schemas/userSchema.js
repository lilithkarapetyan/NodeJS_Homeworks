const { Schema } = require('mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        unique: [true, "User already exists."],
        required: [true, 'Email address is required.'],
    },
    password: String,
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = UserSchema;