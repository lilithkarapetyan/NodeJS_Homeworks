const NotFoundError = require('./NotFoundError');
const InternalError = require('./InternalError');
const ForbiddenError = require('./ForbiddenError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
    NotFoundError,
    InternalError,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError,
};
