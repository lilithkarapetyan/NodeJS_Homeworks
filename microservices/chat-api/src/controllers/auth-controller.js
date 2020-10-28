const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const DB = require('../DB');
const { BadRequestError } = require("../errors");

const signIn = async ({ response: res, request: req }, next) => {
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

        const token = await JWT.sign(id, process.env.JWTSECRET || "SECRET");
        res.status = 200;
        res.body = { token };
    }
    catch (err) {
        throw err;
    }
};

const signUp = async ({request: req, response: res}, next) => {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS * 1 || 1);
        const user = {
            email,
            password: hashedPassword,
            name,
        };

        const createdUser = { ...(await DB.create(user)) };
        createdUser.password = undefined;
        res.status = 200;
        res.body = { user: createdUser };
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    signIn,
    signUp,
};
