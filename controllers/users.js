const usersRouter = require('express').Router();
const { Blog, User, ReadingList } = require('../models');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const where = {};
  if (req.query.read) {
    where.read = req.query.read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes'],
      through: {
        attributes: [],
      },
      include: {
        model: ReadingList,
        attributes: ['id', 'read'],
        where,
      },
    },
  });
  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

usersRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  user.username = req.body.username;
  const updatedUser = await user.save();
  res.json(updatedUser);
});

module.exports = usersRouter;
