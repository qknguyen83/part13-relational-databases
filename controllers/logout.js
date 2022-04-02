const logoutRouter = require('express').Router();
const { tokenExtractor, sessionChecker } = require('../utils/middleware');

logoutRouter.delete('/', tokenExtractor, sessionChecker, async (req, res) => {
  await req.session.destroy();
  res.status(200).end();
});

module.exports = logoutRouter;
