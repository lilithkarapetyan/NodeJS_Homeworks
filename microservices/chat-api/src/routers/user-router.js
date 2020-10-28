const Router = require('koa-trie-router')
const { userController: {
    getMe,
    getAll,
    updateMe,
} } = require('../controllers');

const { authMiddleware, validateUserMiddleware } = require('../middlewares');

const router = new Router();

module.exports = () => {
    router.use(authMiddleware);
    router.get('/', getAll);
    router.get('/me', getMe);
    router.put('/me', validateUserMiddleware({ updating: true }), updateMe);
    return router.middleware();
};
