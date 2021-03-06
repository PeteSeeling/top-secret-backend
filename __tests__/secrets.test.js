const pool = require('../lib/utils/pool');
const UserService = require('../lib/services/UserService');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('top-secret-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('should allow a user to post a secret', async () => {
    const agent = request.agent(app);

    await UserService.create({
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

  it('should allow user to get all secrets', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email:'pete@gmail.com',
      password: 'pleaseWork',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'pete@gmail.com', password:'pleaseWork' });

    await agent
      .post('/api/v1/secrets')
      .send({
        title:'New Secret',
        description: 'new secret text',
      });

    await agent
      .post('/api/v1/secrets')
      .send({
        title:'New Secret 2',
        description: 'new secret text 2',
      });

    const res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual([
      { 
        title:'New Secret',
        description: 'new secret text',
        created_at: expect.any(String),
        id: expect.any(String)
      },
      { 
        title:'New Secret 2',
        description: 'new secret text 2',
        created_at: expect.any(String),
        id: expect.any(String)
      }
    ]); 
  });
});
