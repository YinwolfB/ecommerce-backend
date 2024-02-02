const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newUser = {
            firstName: "tester firstName",
            lastName: "tester lastName",
            email: "tester email",
            password: "tester password",
            phone: "tester phone"
        }
        await request(app).post('/users').send(newUser)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();