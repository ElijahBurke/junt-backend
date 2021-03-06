const bcrypt = require('bcrypt');
const passport = require('passport');
const models = require('../models');

const saltRounds = 10;

const login = passport.authenticate('local', {
  successRedirect: '/auth',
  failureRedirect: '/auth/failure',
});

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await models.users.findOne({ where: { email } });
    if (checkUser) throw new Error('User already exists, try signing in.');
    const hash = bcrypt.hashSync(password, saltRounds);
    const upperName = name[0].toUpperCase() + name.slice(1);
    await models.users.create({ name: upperName, email, password: hash });
    login(req, res);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200);
    res.send(req.user);
  } else {
    res.status(500);
    res.send({ message: 'Not logged in' });
  }
};

const loginFailure = (req, res) => {
  res.send({ error: 'Not Authenticated' });
};

const checkCookie = (req, res) => {
  if (req.user) res.send(req.user);
  else res.send({ message: 'Not authenticated' });
};

const logout = async (req, res) => {
  try {
    await req.logout();
    res.status(200);
    res.send({ message: 'Logged out succesfuly.' });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
};

module.exports = {
  addUser,
  login,
  loginSuccess,
  loginFailure,
  checkCookie,
  logout,
};
