const Router = require('@koa/router');

const authRouter = require('./auth-router');
const userRouter = require('./user-router');

const { errorHandlerMiddlware } = require('../middlewares');

const router = new Router({
    prefix: '/api',
});

router.use(errorHandlerMiddlware);
router.use(authRouter);
router.use(userRouter);

module.exports = router;
