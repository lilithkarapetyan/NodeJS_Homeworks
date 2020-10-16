const { Router } = require('express');
const { userController: {
    getMe,
    getAll,
    updateMe,
} } = require('../controllers');

const router = Router();
router.get('', getAll);
router.get('me', getMe);
router.put('me', updateMe);

module.exports = userRouter;
