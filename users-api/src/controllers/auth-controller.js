const DB = require('../DB');
const JWT = require('jsonwebtoken');
const { BadRequestError } = require("../Errors");

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { id, realPassword } = DB.find({ email })[0] || {};

        const isAuth = bcrypt.compare(password, realPassword);

        if (!isAuth) {
            return next(new BadRequestError('Invalid email or password'));
        }

        const token = await JWT.sign(id, process.env.JWTSECRET);
        return res.status(200).json({ token });
    }
    catch (err) {
        next(err);
    }
};

const signUpIn = (req, res, next) => {
    try {

    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    signIn,
    signUpIn,
};
