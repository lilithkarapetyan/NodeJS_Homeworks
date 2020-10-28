const Router = require('@koa/router')
const { userController: {
    getMe,
    getAll,
    updateMe,
} } = require('../controllers');

const { validateUserMiddleware } = require('../middlewares');

const router = new Router({
    prefix: '/users',
});
router.get('/', getAll);
router.get('/me', getMe);
router.put('/me', validateUserMiddleware({ updating: true }), updateMe);

module.exports = router;
