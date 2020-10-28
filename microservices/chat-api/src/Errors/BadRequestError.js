const ErrorBase = require('../errors/ErrorBase');
class BadRequestError extends ErrorBase{
    constructor(message = 'Invalid arguments'){
        super(400, message);
    }
}

module.exports = BadRequestError;
