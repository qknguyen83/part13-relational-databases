const express = require('express');
require('express-async-errors');
const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const authorsRouter = require('./controllers/authors');
const readinglistsRouter = require('./controllers/readinglists');

const app = express();

app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readinglistsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
