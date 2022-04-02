const blogsRouter = require('express').Router();
const { Op } = require('sequelize');
const { Blog, User } = require('../models');
const { tokenExtractor, sessionChecker, blogFinder } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

blogsRouter.post('/', tokenExtractor, sessionChecker, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id });
  res.json(blog);
});

blogsRouter.delete('/:id', tokenExtractor, sessionChecker, blogFinder, async (req, res) => {
  if (req.blog && req.decodedToken.id === req.blog.userId) {
    await req.blog.destroy();
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
