const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    }catch(error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try{

      const user = await UserService.signIn(req.body);
      const token = user.authToken();

      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });

      res.send({ 
        message: 'Signed in successfully!', 
        user });
        
    } catch(error) {
      next(error);
    }
  });
  
