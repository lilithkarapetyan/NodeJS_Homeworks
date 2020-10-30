const DB = require('../DB');
const { get } = require('../DB');
const getMe = async ({ response: res, request: req }, next) => {
    try {
        const user = { ...req.user };
        user.password = undefined;
        res.status = 200;
        res.body = { user };
        return;
    }
    catch (err) {
        throw err;
    }
};

const getAll = async ({ response: res }, next) => {
    try {
        const users = await get();
        res.status = 200;
        res.body = { users };
        return;
    }
    catch (err) {
        throw err;
    }
};

const updateMe = async ({ response: res, request: req }, next) => {
    try {
        const { email, name, password } = req.body;
        const { id } = req.user;
        const updatedUser = await DB.update({
            id,
            email,
            name,
            password,
        });

        res.status = 200;
        res.body = { user: updatedUser };
        return;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getMe,
    getAll,
    updateMe,
};
