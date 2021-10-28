/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const ConflictError = require('./errors/ConflictError');

const app = express();

app.use(cors());
app.options('*', cors());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/news-explorer');

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.post('/signin', login);

app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);

app.use('/articles', articlesRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === 'MongoError' || err.code === 11000) {
    throw new ConflictError('User already exists!');
  }
  res
    .status(err.statusCode)
    .send({ message: err.statusCode === 500 ? 'Server error' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
