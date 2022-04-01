const usersRouter = require('express').Router();
const { Blog, User } = require('../models');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
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
