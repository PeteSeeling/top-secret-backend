const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


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

});
