const User = require('../schemas/users');
const LocalStrategy = require('passport-local').Strategy;

exports.initialize = (passport) => {
  // Used to serialize the user for the session on the front end (only expose user id)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Used to deserialize the user for use on the backend
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

exports.registerStrategies = (passport) => {
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

exports.setup = (app, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
