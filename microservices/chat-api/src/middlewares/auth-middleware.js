const JWT = require('jsonwebtoken');
const DB = require('../DB');
const { UnauthorizedError } = require('../errors');
const authMiddleware = async ({ response: res, request: req }, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedError();
        }

        const userId = await JWT.verify(authorization, process.env.JWTSECRET || "SECRET");
        if (!userId) {
            throw new UnauthorizedError();
        }

        const user = await DB.getOneById(userId);
        if (!user) {
            throw new UnauthorizedError();
        }

        req.user = user;

        await next();
    }
    catch (err) {
        throw err;
    }
}

module.exports = authMiddleware;