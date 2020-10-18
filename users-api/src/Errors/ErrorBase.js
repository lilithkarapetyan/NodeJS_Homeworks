class ErrorBase extends Error{
    constructor(status, message){
        super(message);
        this.isCustom = true;
        this.status = status;
        this.message = message;
    }
}

module.exports = ErrorBase;
