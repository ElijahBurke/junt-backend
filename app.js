/* eslint-disable new-cap */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const router = require('./router');
const apiErrorHandler = require('./utils/apiErrorHandler');
const ApiError = require('./utils/apiError');

const initializePassport = require('./passport.config');

initializePassport(passport);

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true,
      maxAge: 5184000000,
    },
  }),
);
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://junt-tool.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.all('*', (req, res, next) => next(
  ApiError.notFound(`Can't find ${req.originalUrl} on this server`),
));

app.use(apiErrorHandler);

module.exports = app;
