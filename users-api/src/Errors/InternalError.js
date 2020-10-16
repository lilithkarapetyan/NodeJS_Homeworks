class InternalError {
    constructor(message = 'Internal Server Error'){
        super(500, message);
    }
}

module.exports = InternalError;
