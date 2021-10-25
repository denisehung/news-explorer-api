const jwt = require('jsonwebtoken');
const { privateKey } = require('../utils/configuration');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : privateKey);
  } catch (err) {
    throw new AuthorizationError('Authorization required');
  }

  req.user = payload;
  next();
};

module.exports = auth;
