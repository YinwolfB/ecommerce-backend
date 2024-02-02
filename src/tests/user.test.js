const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users crea un usuario', async () => {
    const newUser = {
        firstName: "test firstName",
        lastName: "test lastName",
        email: "test email",
        password: "test password",
        phone: "test phone"
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newUser.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login logea al usuario', async () => {
    const credentials = {
        email: "test email",
        password: "test password",
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.userlog.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
});

test('GET /users trae todos los usuarios.', async () => {
    const res = await request(app)
        .get('/users')
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id actualiza un usuario', async () => {
    const update = {
        lastName: 'test apellido'
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(update)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(update.lastName);
});

test('DELETE /users/:id borra un usuario', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});