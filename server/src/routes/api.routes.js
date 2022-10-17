const { Router } = require('express');
const router = Router();

const api = require('../controllers/api.controller');

router.post('/signIn', api.signIn);

router.get('/private', api.verifyToken, api.getPrivate);

module.exports = router;