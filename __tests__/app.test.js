const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


describe('top-secret-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user with email/password via POST', async() => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'pete@gmail.com', password:'pleaseWork' });

    expect(res.body).toEqual({ id: expect.any(String), email: 'pete@gmail.com', hashedPassword: expect.any(String) });
  });
    
  it('signs in an existing user', async () => {
    const user = await UserService.create({
      email:'pete@gmail.com',
      password: 'pleaseWork',
    });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'pete@gmail.com', password:'pleaseWork' });

    expect(res.body).toEqual({
      message: 'Signed in successfully!',
      user,

    });
  });

  it('log out  a user by deleting cookie', async() => {
    let user = await UserService.create({
      email:'pete@gmail.com',
      password:'pleaseWork',
    });

    user = await UserService.signIn({
      email:'pete@gmail.com',
      password:'pleaseWork',
    });
    const res = await request(app)
      .delete('/api/v1/users/sessions')
      .send(user);

    expect(res.body).toEqual({
      message:'Signed Out Successfully'
    });

  });

});
