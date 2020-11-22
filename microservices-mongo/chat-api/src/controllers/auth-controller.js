const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');

const { UserModel } = require('chat-schemas');
const { BadRequestError } = require("../Errors");

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = (await UserModel.findOne({ email }) || { })._doc;
        const { _id, password: realPassword } = JSON.parse(JSON.stringify(foundUser)) || {};

        if (!password || !realPassword) {
            return next(new BadRequestError('Invalid email or password'));
        }
        console.log(password, realPassword)
        const isAuth = await bcrypt.compare(password, realPassword);
        if (!isAuth) {
            return next(new BadRequestError('Invalid email or password'));
        }
        console.log(foundUser, _id)
        const token = await JWT.sign(_id, process.env.JWTSECRET || "SECRET");
        return res.status(200).json({ token });
    }
    catch (err) {
        return next(err);
    }
};

const signUp = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS * 1 || 1);
        const user = {
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hashedPassword,
            firstName,
            lastName,
        };

        const createdUser = { ...(await UserModel.create(user))._doc };
        createdUser.password = undefined;
        return res.status(200).json({ user: createdUser });
    }
    catch (err) {
        return next(err);
    }
};

module.exports = {
    signIn,
    signUp,
};
