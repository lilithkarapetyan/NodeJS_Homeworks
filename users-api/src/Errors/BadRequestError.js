class BadRequestError {
    constructor(message = 'Invalid arguments'){
        super(400, message);
    }
}

module.exports = BadRequestError;
