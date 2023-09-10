const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');

router.use('/users', authRouter);
// router.use('/stuff', stuffRouter);

module.exports = router;