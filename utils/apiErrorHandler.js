/* eslint-disable no-unused-vars */
const ApiError = require('./apiError');

function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).send(err.message);
  }

  if (err.name === 'SequelizeDatabaseError') {
    res.status(400).send('Entity does not exist!');
  }

  res.status(500).send('Something went wrong!');
}

module.exports = apiErrorHandler;
