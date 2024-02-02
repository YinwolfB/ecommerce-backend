const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async (req, res) => {
    const results = await Purchase.findAll({
        include: [Product],
        where: { userId: req.user.id }
    })
    return res.json(results)
});

const create = catchError(async (req, res) => {
    const productCart = await ProductCart.findAll({
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    })
    const purchase = await Purchase.bulkCreate(productCart)
    await ProductCart.destroy({ where: { userId: req.user.id } })
    return res.json(purchase)
});

module.exports = {
    getAll,
    create
}