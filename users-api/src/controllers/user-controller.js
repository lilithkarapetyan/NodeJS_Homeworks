const DB = require('../DB');
const { get } = require('../DB');
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
        const users = await get();
        return res.status(200).json({ users });
    }
    catch (err) {
        return next(err);
    }
};

const updateMe = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const { id } = req.user;
        const updatedUser = await DB.update({
            id,
            email,
            name,
            password,
        });

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
