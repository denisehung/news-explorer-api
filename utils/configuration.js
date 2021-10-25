const { NODE_ENV, DATABASE_URL } = process.env;

module.exports.MONGO_SERVER =
  NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/news-explorer';

module.exports.privateKey = 'some-secret-key';
