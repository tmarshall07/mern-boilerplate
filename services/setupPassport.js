const User = require('../schemas/users');

module.exports = (passport) => {
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
