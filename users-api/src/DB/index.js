const uuid = require('uuid');
const fs = require('fs').promises;
const {
    NotFoundError,
    BadRequestError,
} = require('../Errors');

let db;

const _save = async () => {
    const dbText = JSON.stringify(db);
    await fs.writeFile('./db.json', dbText);
};

const connect = async () => {
    db = JSON.parse(await fs.readFile('./db.json'));
    if (!db)
        db = {};
};

const create = async (user) => {
    const userId = uuid.v4();
    db[userId] = user;
    await _save();
    return user;
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
        db[id][key] = user[key];
    }

    await _save();
    return user;
};

const get = async () => {
    const users = [];
    db.entries().forEach(u => {
        const user = u[1];
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
    return user;
};

const find = async (criteria = {}) => {

    let users = db.entries()
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
        })

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
