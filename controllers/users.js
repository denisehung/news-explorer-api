const mongoose = require('mongoose');
const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (!user) {
      throw new NotFoundError('User could not be found!');
    } else {
      return res.status(200).send({ user });
    }
  });
};
