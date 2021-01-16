const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('./models');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await models.users.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (!await bcrypt.compare(password, user.password)) return done(null, false, { message: 'Password Incorrect' });
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: 'email' },
    authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => done(null, await models.users.findByPk(id,
    {
      include: {
        model: models.tests,
        include: models.applications,
      },
    })));
}

module.exports = initialize;
