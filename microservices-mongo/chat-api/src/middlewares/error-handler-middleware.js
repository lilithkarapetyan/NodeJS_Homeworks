const errorHandlerMiddleware = (err, req, res, next) => {
    if (err.isCustom) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    console.log(err);

    return res.status(500).json({
        message: 'Internal server error',
    });
};

module.exports = errorHandlerMiddleware;