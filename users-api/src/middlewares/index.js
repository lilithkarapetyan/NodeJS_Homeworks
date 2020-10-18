const authMiddleware = require('./auth-middleware');
const validateUserMiddleware = require('./validate-user-middleware');

module.exports = {
    authMiddleware,
    validateUserMiddleware,
};
