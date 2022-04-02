const jwt = require('jsonwebtoken');
const { Blog, Session } = require('../models');
const { SECRET } = require('./config');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      req.token = authorization.substring(7);
    } catch {
      res.status(401).json({ error: 'invalid token' });
    }
  } else {
    res.status(401).json({ error: 'token missing' });
  }
  next();
};

const sessionChecker = async (req, res, next) => {
  req.session = await Session.findOne({
    token: req.token,
  });

  if (!req.session) {
    res.status(401).json({ error: 'session expired' });
  }

  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  sessionChecker,
  blogFinder,
  unknownEndpoint,
  errorHandler,
};
