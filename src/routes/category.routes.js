const { getAll, create, getOne, remove, update } = require('../controllers/category.controllers');
const express = require('express');
const verfyJWT = require('../utils/verifyJWT');

const categoryRouter = express.Router();

categoryRouter.route('/categories')
    .get(getAll)
    .post(verfyJWT, create);

categoryRouter.route('/categories/:id')
    .get(verfyJWT, getOne)
    .delete(verfyJWT, remove)
    .put(verfyJWT, update);

module.exports = categoryRouter;