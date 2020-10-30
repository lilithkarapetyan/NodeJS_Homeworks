const Router = require('koa-trie-router')
const { userController: {
    getMe,
    getAll,
    updateMe,
} } = require('../controllers');

const { authMiddleware, validateUserMiddleware } = require('../middlewares');

const router = new Router();

module.exports = () => {
    router.get('/', authMiddleware, getAll);
    router.get('/me', authMiddleware, getMe);
    router.put('/me', authMiddleware, validateUserMiddleware({ updating: true }), updateMe);
    return router.middleware();
};
