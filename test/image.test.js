const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
const path = require('path');

const userMaster = {
    name: 'Master Tester',
    email: 'masteruser@test',
    password: '12345678',
    token: ''
}

beforeAll(() => {
    return request.post('/user')
        .send(userMaster)
        .then(res => {
            return request.post('/auth')
                .send({email: userMaster.email, password: userMaster.password})
                .then(res => {
                    userMaster.token = res.body.token;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
});

afterAll(async () => {
    return request.delete('/user/' + userMaster.email)
        .then(res => {})
        .catch(err => {
            console.log(err);
        })

});

describe('Gestão de imagens', () => {
    test('Deve cadastrar uma imagem com sucesso', () => {
        const imagePath = path.join(__dirname, './assets/example.jpg');
        const imageBuffer = fs.readFileSync(imagePath);

        return request.post('/image')
            .set('Authorization', `Bearer ${userMaster.token}`)
            .set('Content-Type', 'image/jpeg')
            .send(imageBuffer)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.filename).toBeDefined();
            })
            .catch(err => {
                throw new Error(err);
            })
    });
});