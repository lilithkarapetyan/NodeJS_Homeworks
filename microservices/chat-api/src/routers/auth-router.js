const Router = require('koa-trie-router');
const { authController: {
    signIn,
    signUp,
} } = require('../controllers');

const { validateUserMiddleware } = require('../middlewares');

const router = new Router();

module.exports = () => {
    router.post('/signin', signIn);
    router.post('/signup', validateUserMiddleware(), signUp);
    return router.middleware();
};
