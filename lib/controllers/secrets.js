const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const secretPost = await Secret.insertSecret(req.body);
      res.send(secretPost);

    }catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try{
      const allSecrets = await Secret.getAllSecrets();
      res.send(allSecrets);
    } catch (error){
      next(error);
    }
  });

