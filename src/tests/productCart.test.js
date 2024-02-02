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

test('GET /productscart', async () => {
    const res = await request(app)
        .get('/productscart')
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /productscart', async () => {
    const product = await Product.create({
            title: "test title",
            description: "test descrption",
            brand: "test brand",
            price: 100.001
    })
    const newProductCart = {
        quantity: 5,
        productId: product.id,
    }
    const res = await request(app)
        .post('/productscart')
        .send(newProductCart)
        .set('authorization', `Bearer ${token}`);
    id = res.body.id
    await product.destroy
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newProductCart.quantity);
    expect(res.body.id).toBeDefined();
});

test('DELETE /productscart/:id', async () => {
    const res = await request(app)
        .delete(`/productscart/${id}`)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});