const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
});
