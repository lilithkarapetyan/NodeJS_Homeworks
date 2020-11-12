const authMiddleware = require('./auth-middleware');
const validateUserMiddleware = require('./validate-user-middleware');
const errorHandlerMiddleware = require('./error-handler-middleware');

module.exports = {
    authMiddleware,
    validateUserMiddleware,
    errorHandlerMiddleware,
};
