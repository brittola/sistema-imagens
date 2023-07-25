const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

const userMaster = {
    name: 'Master Tester',
    email: 'masteruser@test',
    password: '12345678'
}

beforeAll(() => {
    return request.post('/user')
        .send(userMaster)
        .then(res => {})
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

describe('Cadastro de usuário', () => {
    test('Deve cadastrar um usuário com sucesso', () => {
        let newEmail = `${Date.now()}@gmail.com`;

        const user = {
            name: 'Gabriel Rodrigues',
            email: newEmail,
            password: 'teste1234'
        }

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email == user.email);
            })
            .catch(err => {
                throw new Error(err);
            })
    });
    test('Deve impedir cadastro com dados inválidos', () => {
        const user = {
            name: '',
            email: '',
            password: ''
        }

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
            })
            .catch(err => {
                throw new Error(err);
            })
    });
    test('Deve impedir que um usuário cadastre-se com e-mail repetido', () => {
        let newEmail = `${Date.now()}@gmail.com`;

        const user = {
            name: 'Gabriel Rodrigues',
            email: newEmail,
            password: 'teste1234'
        }

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email == user.email);

                // tenta cadastrar novamente, com o mesmo e-mail gerado
                return request.post('/user')
                    .send(user)
                    .then(res => {
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual('Usuário já cadastrado');
                    })
                    .catch(err => {
                        throw new Error(err);
                    })
            })
            .catch(err => {
                throw new Error(err);
            })
    });
});

describe('Autenticação de usuário', () => {
    test('Deve retornar um token quando logar', () => {
        return request.post('/auth')
            .send({email: userMaster.email, password: userMaster.password})
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined();
            })
            .catch(err => {
                throw new Error(err);
            })
    });
    test('Deve impedir que um usuário não cadastrado faça login', () => {
        return request.post('/auth')
            .send({email: 'emailnaocadastrado@teste', password: '1252034958'})
            .then(res => {
                expect(res.statusCode).toEqual(401);
            })
            .catch(err => {
                throw new Error(err);
            })
    });
    test('Deve impedir que um usuário faça login com senha incorreta', () => {
        return request.post('/auth')
            .send({email: userMaster.email, password: 'senha incorreta'})
            .then(res => {
                expect(res.statusCode).toEqual(401);
            })
            .catch(err => {
                throw new Error(err);
            })
    })
});