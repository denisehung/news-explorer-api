/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image })
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article could not be found!');
      }
      else if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError("That's not yours to touch!");
      }
      res.status(200).send({ article });
    })
    .catch(next);
};


// owner: req.user._id