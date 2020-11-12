const { Router } = require('express');
const { authController: {
    signIn,
    signUp,
} } = require('../controllers');

const { validateUserMiddleware } = require('../middlewares');

const router = Router();
router.post('/signin', signIn);
router.post('/signup', validateUserMiddleware(), signUp);

module.exports = router;
