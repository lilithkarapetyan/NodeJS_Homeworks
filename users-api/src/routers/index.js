const { Router } = require('express');

const authRouter = require('./auth-router');
const userRouter = require('./user-router');

const { authMiddleware } = require('../middlewares');

const router = Router();
router.use('auth', authRouter);
router.use(authMiddleware);
router.use('users', userRouter);

module.exports = {
    authRouter,
    userRouter,
};
