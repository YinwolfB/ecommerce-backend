const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "tester email",
        password: "tester password",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /cart', async () => {
    const res = await request(app)
        .get('/cart')
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const product = await Product.create({
        title: "test title",
        description: "test description",
        brand: "test brand",
        price: 100.001
    });
    const newProductCart = {
        quantity: 5,
        productId: product.id,
    };
    const res = await request(app)
        .post('/cart')
        .send(newProductCart)
        .set('authorization', `Bearer ${token}`);
    await product.destroy();
    expect(res.status).toBe(201);
    expect(parseInt(res.body.quantity, 10)).toBe(newProductCart.quantity);
    expect(res.body.id).toBeDefined();
});

test('DELETE /cart/:id', async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});