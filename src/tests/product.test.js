const request = require('supertest');
const app = require('../app');
require('../models')

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

test('GET /products trae todos los productos.', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const newProduct = {
        title: "test title",
        description: "test descrption",
        brand: "test brand",
        price: 100.001
    }
    const res = await request(app)
        .post('/products')
        .send(newProduct)
        .set('authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
    expect(res.body.id).toBeDefined();
});

test('DELETE /products/:id borra un producto', async () => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});