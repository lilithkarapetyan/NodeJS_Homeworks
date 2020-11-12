const { UserModel } = require('chat-schemas');

const getMe = async (req, res, next) => {
    try {
        const user = { ...req.user };
        user.password = undefined;
        return res.status(200).json({ user });
    }
    catch (err) {
        return next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = (await UserModel.find())._doc;
        return res.status(200).json({ users });
    }
    catch (err) {
        return next(err);
    }
};

const updateMe = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        const { id } = req.user;
        const updatedUser = (await UserModel.updateOne({
            _id: id,
            email,
            firstName,
            lastName,
            password,
        }))._doc;

        return res.status(200).json({ user: updatedUser });
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    getMe,
    getAll,
    updateMe,
};
