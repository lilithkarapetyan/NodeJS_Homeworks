const errorHandlerMiddleware = async ({ response: res, request: req }, next) => {
    try {
        await next();
    } catch (err) {
        if (err.expose) {
            res.status = err.status;
            res.body = {
                message: err.message,
            };
            return;
        }

        console.log(err);

        res.status = 500;
        res.body = {
            message: 'Internal server error',
        };
    }
}

module.exports = errorHandlerMiddleware;