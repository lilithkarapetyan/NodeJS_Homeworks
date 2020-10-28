
const Router = require('koa-trie-router');
const mount = require('koa-mount');

const authRouter = require('./auth-router');
const userRouter = require('./user-router');

const { errorHandlerMiddleware } = require('../middlewares');

const router = new Router({
    prefix: '/api',
});

module.exports = () => {
    router.use(errorHandlerMiddleware);
    router.use(mount('/auth', authRouter()));
    router.use(mount('/users', userRouter()));
    return router.middleware();
};
