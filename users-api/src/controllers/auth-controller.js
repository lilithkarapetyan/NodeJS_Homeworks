const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const DB = require('../DB');
const { BadRequestError } = require("../errors");

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = (await DB.find({ email }))[0]
        const { id, password: realPassword } = foundUser || {};

        if (!password || !realPassword) {
            return next(new BadRequestError('Invalid email or password'));
        }

        const isAuth = await bcrypt.compare(password, realPassword);
        if (!isAuth) {
            return next(new BadRequestError('Invalid email or password'));
        }

        const token = await JWT.sign(id, process.env.JWTSECRET);
        return res.status(200).json({ token });
    }
    catch (err) {
        return next(err);
    }
};

const signUp = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS * 1);
        const user = {
            email,
            password: hashedPassword,
            name,
        };

        const createdUser = { ...(await DB.create(user))};
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
