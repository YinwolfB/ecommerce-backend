const express = require('express');
const userRouter = require('./user.routes');
const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');
const imageRouter = require('./image.routes');
const productCartRouter = require('./productCart.routes');
const purchaseRouter = require('./purchase.routes');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use(categoryRouter)
router.use(productRouter)
router.use(imageRouter)
router.use(productCartRouter)
router.use(purchaseRouter)


module.exports = router;