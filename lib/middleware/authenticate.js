const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const cookie = req.cookie[process.env.COOKIE_NAME];
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch(error) {
    error.message = 'You must be signed in to Access';
    error.status = 401;

    next(error);
  }
};
