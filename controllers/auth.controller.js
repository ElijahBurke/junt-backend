const bcrypt = require('bcrypt');
const passport = require('passport');
const models = require('../models');

const saltRounds = 10;

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await models.users.findOne(
//       {
//         where: { email },
//         include: {
//           model: models.tests,
//           include: models.applications,
//         },
//       },
//     );
//     const passwordIsCorrect = bcrypt.compareSync(password, user.password);
//     if (!passwordIsCorrect) throw new Error('Incorrect password!');
//     res.cookie('user', user.id, {
//       signed: true,
//     });
//     // res.session.user = user.id;
//     res.status(200);
//     res.send(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(404);
//     res.send(e);
//   }
// };

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
  console.log('hi');
  console.log(req.user);
  console.log(req.cookie);
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

module.exports = {
  addUser,
  login,
  loginSuccess,
  loginFailure,
  checkCookie,
};
