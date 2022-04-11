const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log(cookie, 'coookkiiee');
    const payload = jwt.verify(cookie, process.env.JWT_SECRETS);
    console.log(payload, 'paaayyyyylooooaddd')

    req.user = payload;
    next();
  } catch(error) {
    error.message = 'You must be signed in to Access';
    error.status = 401;

    next(error);
  }
};
