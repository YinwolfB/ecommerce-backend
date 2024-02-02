const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verfyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/users')
    .get(verfyJWT, getAll)
    .post(create);

userRouter.route('/users/login')
    .post(login)

userRouter.route('/users/:id')
    .get(verfyJWT, getOne)
    .delete(verfyJWT, remove)
    .put(verfyJWT, update);

module.exports = userRouter;