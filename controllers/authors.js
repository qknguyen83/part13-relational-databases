const authorsRouter = require('express').Router();
const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

authorsRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('id')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'],
    ],
    group: 'author',
    order: sequelize.literal('total_likes DESC'),
  });

  res.json(authors);
});

module.exports = authorsRouter;
