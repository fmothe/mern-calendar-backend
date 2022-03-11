
/*
    host + /api/auth
 */

const {Router} = require('express');
const { createUser, login, renewToken } = require('../controllers/authController');
const router = Router();



router.post('/register', createUser)

router.post('/', login);

router.get('/renew', renewToken)

module.exports = router