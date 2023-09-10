const express = require('express');
const router = express.Router();

const signinMiddleware = require('../middlewares/users/signin');
const signupMiddleware = require('../middlewares/users/signup');
const auth = require('../middlewares/users/auth');

const signup = require('../controllers/users/signup');
const signin = require('../controllers/users/signin');
const check = require('../controllers/users/check');
const getOne = require('../controllers/users/getOne');

router.post('/', check);
router.get('/', auth, getOne);
router.post('/signup', signupMiddleware, signup);
router.post('/signin', signinMiddleware, signin);

module.exports = router;