const readinglistsRouter = require('express').Router();
const { ReadingList } = require('../models');
const { tokenExtractor, sessionChecker } = require('../utils/middleware');

readinglistsRouter.post('/', async (req, res) => {
  await ReadingList.create({ ...req.body, read: false });
  res.status(200).end();
});

readinglistsRouter.put('/:id', tokenExtractor, sessionChecker, async (req, res) => {
  const reading = await ReadingList.findByPk(req.params.id);

  if (!reading || reading.userId !== req.decodedToken.id) {
    return res.status(400).json({ error: 'invalid blog id' });
  }

  reading.read = req.body.read;
  const updatedReading = await reading.save();

  res.json(updatedReading);
});

module.exports = readinglistsRouter;
