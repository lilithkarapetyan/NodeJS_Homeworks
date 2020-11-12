const ErrorBase = require('../errors/ErrorBase');
class NotFoundError extends ErrorBase {
    constructor(message = 'The requested resource is not found') {
        super(404, message);
    }
}

module.exports = NotFoundError;
