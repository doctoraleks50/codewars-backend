const express = require('express');
const exampleRouter = require('./example');
const tasksRouter = require('./tasks');
const authRouter = require('./auth');
const userRouter = require('./users')

const router = express.Router();

router.use('/example', exampleRouter);
router.use('/tasks', tasksRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter)

module.exports = router;
