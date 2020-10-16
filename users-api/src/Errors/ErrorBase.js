class ErrorBase extends Error{
    isCustom = true;
    constructor(status, message){
        status = status;
        message = message;
    }
}