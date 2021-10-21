const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

function validateUrl(string) {
  if (!validator.isUrl(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

router.get(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateUrl),
      image: Joi.string().required().custom(validateUrl),
    }),
  }),
  getArticles,
);

router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateUrl),
      image: Joi.string().required().custom(validateUrl),
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:id',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle,
);
