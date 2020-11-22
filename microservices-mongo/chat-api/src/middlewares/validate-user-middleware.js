const { BadRequestError } = require('../Errors');
const validateUserMiddleware = ({ updating = false } = {}) => {
    return async (req, res, next) => {
        try {
            const { email, password, firstName, lastName} = req.body;

            if (!(email && password && firstName && lastName) && !updating) {
                throw new BadRequestError('All the fields are required');
            }

            if (email && !(email.includes('@') &&
                email.split('@')[1].includes('.'))) {
                throw new BadRequestError('Please Enter a valid email address');
            }

            if (password && !(password.length >= 8)) {
                throw new BadRequestError('The password must be at least 8 characters long');
            }

            if (firstName && !(firstName.length >= 2)) {
                throw new BadRequestError('Please Enter a valid name');
            }

            if (lastName && !(lastName.length >= 2)) {
                throw new BadRequestError('Please Enter a valid name');
            }

            return next();
        }
        catch (err) {
            return next(err);
        }
    };
}

module.exports = validateUserMiddleware;