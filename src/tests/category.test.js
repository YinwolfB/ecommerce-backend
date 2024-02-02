const request = require('supertest');
const app = require('../app');

beforeAll(async()=>{
    const credentials = {
        email: "tester email",
        password: "tester password",
    } 
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token
})

let id;
let token;

test('GET /categories trae todas las categorias', async () => {
    const res = await request(app)
        .get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => {
    const newCategories = {name: 'test categories'}
    const res = await request(app)
        .post('/categories')
        .send(newCategories)
        .set('authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategories.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id actualiza una gategoria', async () => {
    const update = {
        name: 'teste categories'
    }
    const res = await request(app)
        .put(`/categories/${id}`)
        .send(update)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(update.name);
});

test('DELETE /categories/:id borra una categoria', async () => {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});