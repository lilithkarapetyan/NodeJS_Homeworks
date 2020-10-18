const JWT = require('jsonwebtoken');
const DB = require('../DB');
const { UnauthorizedError } = require('../errors');
const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedError();
        }

        const userId = await JWT.verify(authorization.split(" ")[1], process.env.JWTSECRET);
        if (!userId) {
            throw new UnauthorizedError();
        }

        const user = await DB.getOneById(userId);
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