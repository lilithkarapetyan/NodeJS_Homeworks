const ErrorBase = require('../errors/ErrorBase');
class InternalError extends ErrorBase{
    constructor(message = 'Internal Server Error'){
        super(500, message);
    }
}

module.exports = InternalError;
