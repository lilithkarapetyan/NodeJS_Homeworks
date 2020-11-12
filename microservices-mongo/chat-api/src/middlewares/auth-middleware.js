const JWT = require('jsonwebtoken');
const { UserModel } = require('chat-schemas');
const { UnauthorizedError } = require('../errors');
const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedError();
        }

        const userId = await JWT.verify(authorization, process.env.JWTSECRET || "SECRET");
        if (!userId) {
            throw new UnauthorizedError();
        }

        const user = (await UserModel.findById(userId))._doc;
        if (!user) {
            throw new UnauthorizedError();
        }

        req.user = user;

        return next();
    }
    catch (err) {
        return next(err);
    }
}

module.exports = authMiddleware;