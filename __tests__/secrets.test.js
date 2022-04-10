const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secret-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('should allow a user to post a secret', async () => {
   
    const agent = request.agent(app);

    await agent
      .post('/api/v1/users')
      .send({
        email:'pete@gmail.com',
        password: 'pleaseWork',
      });


    await agent
      .post('/api/v1/users/sessions')
      .send({
        email:'pete@gmail.com',
        password: 'pleaseWork',
      });

    const res = await agent
      .post('/api/v1/secrets')
      .send({
        title:'New Secret',
        description: 'new secret text'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      title:'New Secret',
      description: 'new secret text',
      createdAt: expect.any(String),
    });
  });
});
