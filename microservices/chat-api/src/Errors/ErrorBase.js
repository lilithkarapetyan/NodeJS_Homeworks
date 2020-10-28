class ErrorBase extends Error{
    constructor(status, message){
        super(message);
        this.expose = true;
        this.status = status;
        this.message = message;
    }
}

module.exports = ErrorBase;
