const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/users');

/**
 * Registers all passport authentication strategies
 *
 * @param {Object} passport - passport object
 */
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        User.findOne(
          {
            email,
          },
          (err, user) => {
            if (err) return done(err);

            if (!user) return done(null, false);

            if (!user.validatePassword(password)) return done(null, false);

            return done(null, user);
          },
        );
      },
    ),
  );
};
