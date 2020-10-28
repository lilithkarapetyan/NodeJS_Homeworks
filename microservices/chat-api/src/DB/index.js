const path = require('path');
const uuid = require('uuid');
const fs = require('fs').promises;
const {
    NotFoundError,
    BadRequestError,
} = require('../errors');

let db;

const _save = async () => {
    const dbText = JSON.stringify(db);
    await fs.writeFile(path.join(__dirname, 'db.json'), dbText);
};

const connect = async () => {
    try {
        const readDB = await fs.readFile(path.join(__dirname, 'db.json'));
        if (!readDB.toString()) {
            db = {};
            await _save();
        }
        else {
            db = JSON.parse(readDB.toString());
        }
    }
    catch (err) {
        throw err;
    }
};

const create = async (user) => {
    const { email } = user;
    const foundUser = await find({ email });
    if (foundUser[0]) {
        throw new BadRequestError('User already exists');
    }
    const userId = uuid.v4();
    db[userId] = user;
    await _save();
    const savedUser = { ...db[userId] };
    savedUser.id = userId;
    return savedUser;
};

const update = async (user) => {
    const { id } = user;
    if (!id) {
        throw new BadRequestError('A required parameter missing: id');
    }

    if (!db[id]) {
        throw new NotFoundError('User not found');
    }

    
    for (key in user) {
        if(user[key] !== null && user[key] !== undefined)
        db[id][key] = user[key];
    }

    await _save();
    return user;
};

const get = async () => {
    const users = [];
    Object.entries(db).forEach(u => {
        const user = { ...u[1] };
        user.id = u[0];
        user.password = undefined;
        users.push(user);
    });
    return users;
};

const getOneById = async (id) => {
    const user = db[id];
    if (!user) {
        throw new NotFoundError('User not found');
    }
    user.id = id;
    return user;
};

const find = async (criteria = {}) => {

    let users = Object.entries(db)
        .filter(([id, user]) => {
            for (let key in criteria) {
                if (user[key] !== criteria[key]) {
                    return false;
                }
            }
            return true;
        }).map(([id, user]) => {
            user.id = id;
            return user;
        });

    return users;
};

module.exports = {
    connect,
    get,
    getOneById,
    create,
    update,
    find,
};
