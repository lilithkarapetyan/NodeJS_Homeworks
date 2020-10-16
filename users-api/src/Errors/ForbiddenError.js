class ForbiddenError {
    constructor(message = 'The access to the resource is forbidden'){
        super(403, message);
    }
}

module.exports = ForbiddenError;
