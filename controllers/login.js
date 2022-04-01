const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const correctPassword = body.password === 'password';

  if (!user || !correctPassword) {
    return res.status(400).json({ error: 'Incorrect username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).json({ token, ...userForToken });
});

module.exports = loginRouter;
