/* eslint-disable new-cap */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const router = require('./router');
const apiErrorHandler = require('./utils/apiErrorHandler');
const ApiError = require('./utils/apiError');

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['junt'],
  }),
);
app.use(cookieParser());
app.use(morgan());
app.use(
  session({
    secret: 'junt client',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT.PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use(router);

app.all('*', (req, res, next) => next(
  ApiError.notFound(`Can't find ${req.originalUrl} on this server`),
));

app.use(apiErrorHandler);

module.exports = app;
