const JWT = require('jsonwebtoken');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const signUp = async function (req, res, next) {
    try {
        const { email, password, name } = req.body;

        if (!(email && password && name)) {
            return res.status(400).json({
                message: 'All the fields are required'
            });
        }

        if (!(email.contains('@') &&
            email.split('@')[1].contains('.'))) {
            return res.status(400).json({
                message: 'Please Enter a valid email address'
            });
        }

        if (!(password.length >= 8)) {
            return res.status(400).json({
                message: 'The password must be at least 8 characters long'
            });
        }

        if (!(password.length >= 2)) {
            return res.status(400).json({
                message: 'Please Enter a valid name'
            });
        }

        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS * 1);
        const user = {
            id: uuid.v4(),
            email,
            password: hashedPassword,
            name,
        };

        const db = JSON.parse(await fs.readFile('./db.json'));

        if (!db)
            db = [];

        db.push(user);
        const dbText = JSON.stringify(db);
        await fs.writeFile('./db.json', dbText);

        user.password = undefined;
        return res.status(200).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const signIn = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const db = JSON.parse(await fs.readFile('./db.json'));
        const user = db.find(u => u.email === email);

        const isAuth = bcrypt.compare(password, user.password);

        if (!isAuth) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = await JWT.sign(user, process.env.JWTSECRET);
        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    signUp,
    signIn,
}
