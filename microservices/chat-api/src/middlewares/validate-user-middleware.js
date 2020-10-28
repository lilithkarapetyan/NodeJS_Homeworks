const { BadRequestError } = require('../errors');
const validateUserMiddleware = ({ updating = false } = {}) => {
    return async ({ response: res, request: req }, next) => {
        try {
            console.log(req)
            const { email, password, name } = req.body;

            if (!(email && password && name) && !updating) {
                throw new BadRequestError('All the fields are required');
            }

            if (email && !(email.includes('@') &&
                email.split('@')[1].includes('.'))) {
                throw new BadRequestError('Please Enter a valid email address');
            }

            if (password && !(password.length >= 8)) {
                throw new BadRequestError('The password must be at least 8 characters long');
            }

            if (name && !(name.length >= 2)) {
                throw new BadRequestError('Please Enter a valid name');
            }

            await next();
        }
        catch (err) {
            throw err;
        }
    };
}

module.exports = validateUserMiddleware;