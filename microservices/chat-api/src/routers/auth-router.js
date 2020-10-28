const Router = require('@koa/router');
const { authController: {
    signIn,
    signUp,
} } = require('../controllers');

const { authMiddleware, validateUserMiddleware } = require('../middlewares');

const router = new Router({
    prefix: '/auth',
});

router.use(authMiddleware);
router.post('/signin', signIn);
router.post('/signup', validateUserMiddleware(), signUp);

module.exports = router;
