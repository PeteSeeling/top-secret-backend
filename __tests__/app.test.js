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
      .post('/api/v1/users/signup')
      .send({ email: 'pete@gmail.com', password:'pleaseWork' });

    expect(res.body).toEqual({ id: expect.any(String), email: 'pete@gmail.com', passwordHashed: expect.any(String) });
  });
    
  it('signs in an existing user', async () => {
    const user = await UserService.create({
      email:'pete@gmail.com',
      passwordHashed: this.passwordHashed,
    });
    const res = await request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'pete@gmail.com', password:'pleaseWork' });

    expect(res.body).toEqual({
      message: 'Sign in succesful',
      user,
    });
 
  });
  

});
