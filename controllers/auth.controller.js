const bcrypt = require('bcrypt');
const models = require('../models');

const saltRounds = 10;

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await models.users.findOne({ where: { email } });
    if (checkUser) throw new Error('User already exists, try signing in.');
    const hash = bcrypt.hashSync(password, saltRounds);
    const result = await models.users.create({ name: name.toUpperCase(), email, password: hash });
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(403);
    res.send(e);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.users.findOne({ where: { email } });
    const passwordIsCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordIsCorrect) throw new Error('Incorrect password!');
    res.status(200);
    res.send(user);
  } catch (e) {
    res.status(404);
    res.send(e);
  }
};

module.exports = {
  addUser,
  login,
};
