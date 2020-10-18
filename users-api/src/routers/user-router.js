const { Router } = require('express');
const { userController: {
    getMe,
    getAll,
    updateMe,
} } = require('../controllers');

const { validateUserMiddleware } = require('../middlewares');

const router = Router();
router.get('/', getAll);
router.get('/me', getMe);
router.put('/me', validateUserMiddleware({ updating: true }), updateMe);

module.exports = router;
