const { Router } = require('express');
const router = Router();

const user = require('../controllers/user.controller');

router.post('/signup', user.signUp);

router.post('/signin', user.signIn);

router.get('/tasks', user.getTasks);

router.get('/private-tasks', user.verifyToken, user.getTasks);

module.exports = router;